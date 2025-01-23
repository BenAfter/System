import { sketchupAPI } from '../native/sketchup-binding';
import { ref } from 'ref-napi';

const SUModelRef = ref.refType(ref.types.void);
const SUEntitiesRef = ref.refType(ref.types.void);
const SUMaterialsRef = ref.refType(ref.types.void);
const SUMaterialRef = ref.refType(ref.types.void);
const SUStringRef = ref.refType(ref.types.void);
const SUColorRef = ref.refType(ref.types.void);
const SUTextureRef = ref.refType(ref.types.void);

const parseSketchUpFile = async (file) => {
  const fileReader = new FileReader();
  
  return new Promise((resolve, reject) => {
    fileReader.onload = async (event) => {
      const buffer = event.target.result;
      try {
        const modelData = await processSketchUpModel(file.path);
        resolve(modelData);
      } catch (error) {
        reject(error);
      }
    };
    
    fileReader.readAsArrayBuffer(file);
  });
};

const processSketchUpModel = async (filePath) => {
  const modelRef = ref.alloc(SUModelRef);
  const result = sketchupAPI.SUModelCreateFromFile(modelRef, filePath);
  
  if (result === 0) {
    const geometry = await extractGeometry(modelRef);
    const materials = await extractMaterials(modelRef);
    
    return {
      geometry,
      materials,
      success: true
    };
  }
  
  throw new Error('Failed to load SketchUp model');
};

const extractGeometry = async (modelRef) => {
  const entitiesRef = ref.alloc(SUEntitiesRef);
  const result = sketchupAPI.SUModelGetEntities(modelRef, entitiesRef);
  
  if (result === 0) {
    const numFacesRef = ref.alloc('size_t');
    sketchupAPI.SUEntitiesGetNumFaces(entitiesRef, numFacesRef);
    
    return {
      faces: numFacesRef.deref(),
      vertices: await extractVertices(entitiesRef),
      edges: await extractEdges(entitiesRef)
    };
  }
  
  throw new Error('Failed to extract geometry');
};

const extractVertices = async (entitiesRef) => {
  const verticesRef = ref.alloc('size_t');
  const result = sketchupAPI.SUEntitiesGetNumVertices(entitiesRef, verticesRef);
  
  if (result === 0) {
    return verticesRef.deref();
  }
  return [];
};

const extractEdges = async (entitiesRef) => {
  const edgesRef = ref.alloc('size_t');
  const result = sketchupAPI.SUEntitiesGetNumEdges(entitiesRef, edgesRef);
  
  if (result === 0) {
    return edgesRef.deref();
  }
  return [];
};

const extractMaterials = async (modelRef) => {
  const materialsRef = ref.alloc(SUMaterialsRef);
  const result = sketchupAPI.SUModelGetMaterials(modelRef, materialsRef);
  
  if (result === 0) {
    const numMaterialsRef = ref.alloc('size_t');
    sketchupAPI.SUMaterialsGetNumMaterials(materialsRef, numMaterialsRef);
    
    const materials = [];
    const count = numMaterialsRef.deref();
    
    for (let i = 0; i < count; i++) {
      const materialRef = ref.alloc(SUMaterialRef);
      sketchupAPI.SUMaterialsGetMaterialByIndex(materialsRef, i, materialRef);
      
      materials.push({
        name: getMaterialName(materialRef),
        color: getMaterialColor(materialRef),
        texture: getMaterialTexture(materialRef)
      });
    }
    
    return materials;
  }
  
  throw new Error('Failed to extract materials');
};

const getMaterialName = (materialRef) => {
  const nameRef = ref.alloc(SUStringRef);
  const result = sketchupAPI.SUMaterialGetName(materialRef, nameRef);
  
  if (result === 0) {
    const name = nameRef.deref();
    sketchupAPI.SUStringRelease(nameRef);
    return name;
  }
  return 'Unnamed Material';
};

const getMaterialColor = (materialRef) => {
  const colorRef = ref.alloc(SUColorRef);
  const result = sketchupAPI.SUMaterialGetColor(materialRef, colorRef);
  
  if (result === 0) {
    const color = colorRef.deref();
    return {
      r: color.red,
      g: color.green,
      b: color.blue,
      a: color.alpha
    };
  }
  return { r: 255, g: 255, b: 255, a: 1 };
};

const getMaterialTexture = (materialRef) => {
  const textureRef = ref.alloc(SUTextureRef);
  const result = sketchupAPI.SUMaterialGetTexture(materialRef, textureRef);
  
  if (result === 0) {
    return {
      width: getTextureWidth(textureRef),
      height: getTextureHeight(textureRef),
      data: getTextureData(textureRef)
    };
  }
  return null;
};

const getTextureWidth = (textureRef) => {
  const widthRef = ref.alloc('size_t');
  sketchupAPI.SUTextureGetDimensions(textureRef, widthRef, null);
  return widthRef.deref();
};

const getTextureHeight = (textureRef) => {
  const heightRef = ref.alloc('size_t');
  sketchupAPI.SUTextureGetDimensions(textureRef, null, heightRef);
  return heightRef.deref();
};

const getTextureData = (textureRef) => {
  const bitsRef = ref.alloc('uint8 *');
  const result = sketchupAPI.SUTextureGetImageData(textureRef, bitsRef);
  
  if (result === 0) {
    return bitsRef.deref();
  }
  return null;
};

export { parseSketchUpFile };
