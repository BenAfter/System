const ffi = require('ffi-napi');
const ref = require('ref-napi');

const SUModelRef = ref.refType(ref.types.void);
const SUEntitiesRef = ref.refType(ref.types.void);
const SUGeometryInputRef = ref.refType(ref.types.void);

const sketchupAPI = ffi.Library('SketchUpAPI', {
  'SUModelCreateFromFile': ['uint32', [SUModelRef, 'string']],
  'SUEntitiesFromModel': ['uint32', [SUModelRef, SUEntitiesRef]],
  'SUModelGetEntities': ['uint32', [SUModelRef, SUEntitiesRef]],
  'SUEntitiesGetNumFaces': ['uint32', [SUEntitiesRef, ref.refType('size_t')]],
});

export { sketchupAPI };
