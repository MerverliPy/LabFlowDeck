# LabFlow Deck - Mowgli Export (v8)

This folder contains:
  - SPEC.md: The specification for the app, written in Markdown.
  - SPEC.pdf: PDF version of the SPEC.md file.
  - screens/*.tsx: React components for each screen in the app.
  - screens/images/: Images used in the screen designs.

Read on for a brief description of these files.

## SPEC.md / SPEC.pdf

A Mowgli spec is a Markdown file consisting of the following three sections:
- User Journeys
- Data Model
- Frontend

The User Journeys section describes scenarios for the app's users. Different
scenarios might concern different user types (such as "visitor" and "admin").
User Flows are organized and enumerated hierarchically, and they describe the
user motivation and goal, preconditions, postconditions, and backend/frontend
behavior for a particular scenario.

The Data Model section describes the data model of the application. It contains a
subsection per entity, and each entity has a list of fields and relationships to
other entities.

Finally, the Frontend section contains a subsection per frontend screen. Roughly
speaking, a screen corresponds to a route. Each screen defines its contents
briefly, and sometimes provides additional details on behavior. The screens are
specified in more detail by the app design.

## Screen Code

The screens are provided as .tsx files under the `screens` directory, one for
each screen in the spec.

The app design is represented as a set of React components, each component
corresponding to a screen from the Frontend section of the spec.

The components do not render real data and do not implement any behaviors; they
are, essentially, a static representation of the intended design. The code uses
Tailwind for styling and lucide-react icons. If images are used in the design,
they are provided alongside the screens.

This setup allows the development process to proceed without the typical
untangling and rewriting common in "vibe coded" projects — the screens use
production-ready Tailwind styling, but the code is straightforward and
non-functional. It makes no assumptions about the shape of the data, state
management, backend, or coding style. Individual parts of each screen can be
extracted into components as development progresses, and they are also a good
starting point for further AI-assisted development, if needed.
