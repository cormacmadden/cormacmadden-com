import type { LogoId } from './icons';

/** Agreed CV timeline (see website-build-brief). Items marked tbc need confirming. */
export interface TimelineItem {
  when: string;
  title: string;
  org: string;
  detail?: string;
  /** Longer description, shown when the entry is expanded. */
  body?: string[];
  /** Key into logos in src/data/icons.ts */
  logo?: LogoId;
  kind: 'work' | 'education';
  tbc?: boolean;
}

export const timeline: TimelineItem[] = [
  { kind: 'work', when: '09/2024 – present', title: 'Industrial Operations Digital Innovation & 3D Visualisation', org: 'JLR', logo: 'jlr', detail: 'Digital twins, Omniverse pipeline, driving simulator.', body: [
    "Built an interactive 3D web application in Unity and React that shows live manufacturing data from the Solihull and Halewood plants: zone highlighting, KPI panels over different timeframes, and a replay of the trim line following individual cars along the track.",
    "Simulated body-in-white conveyor routing and the EMS carriers, and spawned and animated robots, spot welders and tip dressers from the engineering data.",
    "Built the 3D data pipeline in NVIDIA Omniverse, connecting Siemens Process Simulate and 3DExperience with live MES and FACMON data. Wrote Kit extensions for it: a Factory Framework for splitting process cells, a zone outline generator, automated optimisation and benchmarking tools, and a CLI for the whole asset manager pipeline.",
    "Modelled low-poly versions of both plants in Blender, including a fence generator built with geometry nodes.",
    "On placement with the VIC Human Factors team, set up a driving simulator with Unreal Engine nDisplay and CarMaker, wired up HMI and vehicle signals through Simulink, and ran a customer clinic with eight participants.",
    "Contributed to an AI chatbot for Trim & Final and Body in White, building the functions and tooling that keep its answers consistent.",
    "Placed in the top 8 of more than 100 teams in the Global Innovation Challenge, and presented at Factory of the Future.",
  ]  },
  { kind: 'work', when: '02/2024 – 04/2024', title: 'Ski rep', org: 'Crystal Ski / TUI, Les Arcs', logo: 'tui', detail: 'Winter season, guest operations.', body: [
    "A winter season in Les Arcs looking after guests from arrival to departure: airport transfers, welcome meetings, lift pass and equipment logistics, and sorting out whatever went wrong in between.",
    "It was a crash course in staying calm under pressure and explaining things clearly to people who are tired, lost or having a bad day, which has been just as useful in user clinics and stakeholder demos since.",
  ]  },
  { kind: 'education', when: '09/2022 – 09/2023', title: 'MSc Augmented & Virtual Reality (1.1)', org: 'Trinity College Dublin', logo: 'trinity', body: [
    "First class honours. Modules in machine learning, computer graphics, computer vision and motion picture engineering.",
    "Dissertation: a head-tracked 3D display built with Unreal Engine and an Azure Kinect, in collaboration with Algorithm.",
  ]  },
  { kind: 'work', when: '12/2022 – 09/2023', title: 'Apprentice Software Developer', org: 'Algorithm', logo: 'algorithm', detail: 'CAVE, nDisplay, Azure Kinect.', body: [
    "Built a CAVE (cave automatic virtual environment) on the studio's 5-metre LED wall: the virtual scene's perspective updates to the viewer's real position, so the wall reads as a window into a 3D world.",
    "Used Unreal Engine nDisplay with an Azure Kinect tracking the viewer's head, and set up a projection-mapping rig on the same principle.",
    "Tested body and head tracking options for Unreal, and configured the studio's LED wall and VR/AR equipment.",
  ]  },
  { kind: 'work', when: '12/2020 – 09/2021', title: 'Post-production & automation (part-time, remote)', org: '3D Design Bureau', logo: '3ddb', body: [
    "Composited architectural visualisations in Photoshop: real photography and rendered buildings combined, with lighting and materials matched to the client's specification.",
    "Added people, skies and vegetation so each image told a story, following the studio's house style: bright, moderately saturated, clear contrast.",
    "Wrote JavaScript to automate repetitive Adobe Creative Suite steps, and built templated documentation in InDesign.",
    "Also produced 360° virtual tours of office and residential developments.",
  ]  },
  { kind: 'work', when: '09/2020 – 12/2020', title: 'Statistics demonstrator', org: 'Trinity College Dublin', logo: 'trinity', body: [
    "Ran online labs and tutorials teaching students to program statistical analysis in RStudio.",
    "Was the first point of contact for any technical trouble students ran into.",
  ]  },
  { kind: 'work', when: '05/2019 – 09/2019', title: 'Unreal content creator', org: 'Beyonity, Berlin', logo: 'beyonity', body: [
    "Hired as a videographer and moved to Unreal Engine once it became clear it could produce high-quality video far faster.",
    "Made product demonstration and promotional videos for the company's site and social channels: storyboarding, filming, editing, animation, VFX and sound design.",
    "Built infographics in After Effects and learned Substance Designer and Painter along the way.",
  ]  },
  { kind: 'education', when: '09/2018 – 06/2022', title: 'BSc Computer Science & Business (1.1)', org: 'Trinity College Dublin', logo: 'trinity', body: [
    "First class honours. Computing modules in algorithms and data structures, functional programming, compiler design, software engineering and symbolic programming, alongside accounting, corporate finance, operations management and marketing.",
    "Final year project: a cloth simulation database for a machine learning project, generated with Houdini and Blender scripts.",
  ]  },
];
