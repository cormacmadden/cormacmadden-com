/** Interactive 3D models shown on /work/media. Files live in public/models/. */
export interface Model {
  id: string;
  title: string;
  description: string;
  /** Path under /public */
  src: string;
  /** Still shown until the model has loaded (path under /public). */
  poster?: string;
  tools: string[];
  /** Starting camera: azimuth, elevation (from straight up), distance as % of the framing distance. */
  cameraOrbit?: { azimuthDeg: number; polarDeg: number; distance: number };
  /** Direction the sunlight comes FROM, relative to the model's centre (any length). */
  sun?: [number, number, number];
  /**
   * Names of the building shell (walls, roof…). These receive shadows but don't cast them,
   * so the sun can reach inside a cut-away interior. Matches an object or any of its parents.
   */
  shell?: string[];
}

export const models: Model[] = [
  {
    id: 'shed-studio',
    title: 'Shed studio',
    description: 'My garden shed, modelled and textured as a studio space. Walls and roof are cut away from the camera side so you can see in.',
    src: '/models/shed-studio.glb',
    poster: '/models/shed-studio-poster.webp',
    tools: ['Blender'],
    cameraOrbit: { azimuthDeg: 30, polarDeg: 68, distance: 0.75 },
    // Sun from high up at the front-right, so furniture throws shadows across the
    // floor and onto the back wall.
    sun: [2, 6, 3.5],
    shell: ['Walls', 'Roof', 'Floor', 'Door', 'Window Frame'],
  },
  {
    id: 'bike',
    title: 'Fixie bike',
    description: 'Fixed-gear bike based on a Cinelli frame, with bullhorn bars and hand-painted decals. Modelled and textured in Blender.',
    src: '/models/bike.glb',
    poster: '/models/bike-poster.webp',
    tools: ['Blender'],
    cameraOrbit: { azimuthDeg: 20, polarDeg: 78, distance: 0.8 },
    sun: [2, 6, 4],
  },
  {
    id: 'concept-chair',
    title: "Le'Rest concept chair",
    description: 'Concept lounge chair designed to hang your legs over the side.',
    src: '/models/concept-chair.glb',
    poster: '/models/concept-chair-poster.webp',
    tools: ['Blender'],
    cameraOrbit: { azimuthDeg: 35, polarDeg: 72, distance: 0.85 },
    sun: [2, 5, 4],
  },
  {
    id: 'soco-motorbike',
    title: 'Super Soco motorbike',
    description: 'Model of a Super Soco TC, built as modelling and texturing practice.',
    src: '/models/soco-motorbike.glb',
    poster: '/models/soco-motorbike-poster.webp',
    tools: ['Blender', 'Substance 3D Painter'],
    cameraOrbit: { azimuthDeg: 25, polarDeg: 76, distance: 0.8 },
    sun: [2, 6, 4],
  },
  {
    id: 'concept-audio-workstation',
    title: 'Concept audio workstation',
    description: 'Groovebox and MIDI controller concept, modelled in Blender.',
    src: '/models/concept-audio-workstation.glb',
    poster: '/models/concept-audio-workstation-poster.webp',
    tools: ['Blender'],
    cameraOrbit: { azimuthDeg: 30, polarDeg: 60, distance: 0.8 },
    sun: [2, 6, 4],
  },
];
