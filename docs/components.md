# Component Documentation

## ModelViewer
The main 3D viewer component that handles model rendering and interactions.

### Props
- `modelData`: Object containing geometry and material data
- `onUpdate`: Callback for model updates

## MaterialEditor
Handles material editing and cost calculations.

### Props
- `open`: Boolean to control dialog visibility
- `materials`: Array of material configurations
- `onClose`: Dialog close handler
- `onMaterialUpdate`: Material update callback

## MaterialLayer
Manages material layer configurations.

### Props
- `onLayerUpdate`: Layer update callback
- `initialLayers`: Array of initial layer configurations

## MaterialPresets
Provides preset material configurations.

### Props
- `onPresetSelect`: Preset selection handler

## ModelControls
Provides model viewing controls.

### Props
- `onZoom`: Zoom control handler
- `onReset`: View reset handler
- `onMaterialEdit`: Material editor toggle handler
