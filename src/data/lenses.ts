import type { ImageMetadata } from 'astro';
import type { LENSES } from '../content.config';
import digitalTwinsImg from '../assets/lenses/digital-twins.jpg';
import realTime3dImg from '../assets/projects/ai-art-gallery-vr/picture1.jpg';
import toolsPipelineImg from '../assets/lenses/tools-pipeline.jpg';

export type LensId = (typeof LENSES)[number];

export interface Lens {
  id: LensId;
  title: string;
  kicker: string;
  intro: string;
  /**
   * Ordered project slugs (file names in src/content/projects).
   * Use 'media/<slug>' to include a Media & 3D post from src/data/artstation.json.
   */
  projects: string[];
  image: { src: ImageMetadata; alt: string };
  /** Optional section between the intro and the project list. */
  context?: {
    heading: string;
    paragraphs: string[];
    groups: { title: string; items: string[] }[];
  };
}

export const lenses: Record<LensId, Lens> = {
  'digital-twins': {
    id: 'digital-twins',
    title: 'Digital twins',
    kicker: 'Industrial 3D · Unity · Omniverse / USD · Web 3D',
    intro:
      'Factories generate enormous amounts of data and almost none of it looks like the place it came from. I build the layer in between: engineering CAD and live line telemetry turned into a 3D model of the plant that people can walk through, query and replay, in a browser rather than on a workstation.',
    projects: ['jlr-digital-twin', 'life-os'],
    image: { src: digitalTwinsImg, alt: 'Car bodies moving along an automated assembly line' },
    // Keep this NDA-safe: no internal tool names, colleagues, data, figures or unreleased models.
    context: {
      heading: 'My work at JLR',
      paragraphs: [
        "Since September 2024 I've been on JLR's Industrial Operations Digital Innovation team, building 3D digital twins of the company's car plants. Most of that work is confidential, so I can't show screenshots, production data or internal tools here: the factory images on this site are JLR press photos or my own representative renders.",
        'What I can do is describe the kind of work involved.',
      ],
      groups: [
        {
          title: 'Web digital twin (Unity + React)',
          items: [
            'An interactive 3D factory linked to live production data, with zone highlighting and hover effects',
            'KPI panels across different timeframes',
            'A replay of the trim line that follows individual cars along the track',
            'Conveyors and overhead carriers simulated across the body shop; robots, spot welders and tip dressers spawned from engineering data and animated as cars enter each station',
          ],
        },
        {
          title: '3D data pipeline (NVIDIA Omniverse + OpenUSD)',
          items: [
            'Kit extensions: a factory framework that splits a plant into process cells, a zone outliner that draws boundaries from fence geometry, and benchmarking and automated optimisation tools',
            'An interactive CLI that runs the whole asset pipeline, from exporting USD files to upload and preparation',
            'A Python tool that reads object positions and rotations from USD files and places them in Unity',
            'Automated orbiting renders and animations of factory zones, plus code reviews of the CAD conversion and BIM library tools',
          ],
        },
        {
          title: 'Modelling and prototyping',
          items: [
            'Low-poly models of two plants in Blender, with a procedural fence generator built in Geometry Nodes',
            'A Figma concept and a three.js prototype of a browser-based digital twin',
            'A process-mining demo built on station activity data',
            'Research into automating boolean operations on factory CAD',
          ],
        },
        {
          title: 'Beyond the twin',
          items: [
            'A driving simulator for the Human Factors team: Unreal Engine nDisplay, CarMaker scenarios, HMI signals through Simulink, and a customer clinic with eight participants',
            'Top 8 of more than 100 teams in the Global Innovation Challenge',
            'Presented at Factory of the Future, and gave VR demos at open days',
            "Coordinated colleagues' work on zone outlines and material-flow documentation",
          ],
        },
      ],
    },
  },
  'real-time-3d': {
    id: 'real-time-3d',
    title: 'Real-time 3D & XR',
    kicker: 'Unreal · XR · Virtual production · Simulation',
    intro:
      'Real-time rendering put to work rather than shipped as a game: LED walls that render for where the viewer is standing, simulators that put a person in a car that does not exist yet, and headsets that drop a model into the room. Mostly Unreal Engine and Unity, usually with a camera or a tracker feeding them.',
    projects: ['head-tracked-led-wall', 'kinect-ue5-plugin', 'jlr-driving-simulator', 'media/hamilton-gardens-apartment-tour', 'media/berlin-penthouse-apartment', 'ai-art-gallery-vr', 'hololens-games'],
    image: { src: realTime3dImg, alt: 'Inside the VR AI art gallery: a bright white gallery space under a glass roof' },
  },
  'tools-pipeline': {
    id: 'tools-pipeline',
    title: 'Tools & pipeline',
    kicker: 'Tech art · Omniverse extensions · Automation',
    intro: 'The unglamorous half of real-time 3D. Heavy CAD has to be optimised before it renders, assets have to move between a dozen formats without being touched by hand, and datasets have to be generated rather than modelled. These are the Omniverse extensions, pipelines and procedural tools I have written to make that happen on its own.',
    projects: ['jlr-digital-twin', 'cloth-sim-generator', 'life-os'],
    image: { src: toolsPipelineImg, alt: 'A factory scene open in NVIDIA Omniverse USD Explorer, with the USD layer stack on the right' },
  },
};
