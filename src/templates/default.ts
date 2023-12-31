class Sketch extends kokomi.Base {
  create() {
    this.renderer.setClearColor(0x202027, 1);

    this.camera.position.set(0, 0, 5);
    new kokomi.OrbitControls(this);

    // const geometry = new THREE.SphereGeometry(2, 64, 64);
    const geometry = new THREE.PlaneGeometry(4, 4);
    const material = new THREE.ShaderMaterial({
      vertexShader: /* glsl */ `
uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;

varying vec2 vUv;

void main(){
vec3 p=position;
gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);

vUv=uv;
}
`,
      fragmentShader: /* glsl */ `
uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;

varying vec2 vUv;

void main(){
vec2 uv=vUv;
gl_FragColor=vec4(uv,0.,1.);
}
`,
    });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    const uj = new kokomi.UniformInjector(this);
    material.uniforms = {
      ...material.uniforms,
      ...uj.shadertoyUniforms,
    };
    this.update(() => {
      uj.injectShadertoyUniforms(material.uniforms);
    });
  }
}
