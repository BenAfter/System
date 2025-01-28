module.exports = {
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      render: jest.fn(),
      dispose: jest.fn()
    })),
    Scene: jest.fn(),
    PerspectiveCamera: jest.fn().mockImplementation(() => ({
      position: { z: 5 },
      updateProjectionMatrix: jest.fn()
    })),
    Vector3: jest.fn(),
    Color: jest.fn(),
    Mesh: jest.fn(),
    BufferGeometry: jest.fn(),
    MeshPhongMaterial: jest.fn(),
    AmbientLight: jest.fn(),
    DirectionalLight: jest.fn()
  };
  