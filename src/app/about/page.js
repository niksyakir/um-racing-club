const missionPoints = [
  "To develop a Formula EV student car — a next-generation electric race car that embodies cutting-edge technology and sustainable engineering.",
  "To advance sustainable transportation by optimizing energy efficiency and promoting eco-friendly engineering practices.",
  "To equip students with real-world engineering experience, fostering leadership, problem-solving skills, and industry collaboration for future advancements in electric vehicle technology.",
];

const projects = [
  {
    title: "Formula Student Malaysia 2026",
    description:
      "Organised by the FSM Committee, held at Litar Dato' Sagor, Perak Darul Ridzuan. Students build a single-seated Formula-style car to compete against teams from across the country. The competition isn't won by the fastest car alone — it's won by the best overall package of construction, performance, financial planning, and sales strategy.",
  },
  {
    title: "NxGV Challenge 2026",
    description:
      "Organised by SAE Malaysia, PERODUA, and MARii. The Next Generation Vehicle Challenge marks the beginning of Malaysia's journey toward producing the next generation of electric vehicle innovators.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-bold text-navy md:text-4xl">About Us</h1>
      <p className="mt-4 text-gray-600">
        UM Racing Team is an engineering club formed by students of the
        Faculty of Engineering, Universiti Malaya. Driven by our shared
        passion for motorsport, we apply the knowledge from our courses to
        solve real-world engineering challenges as a team. Our main goal is
        to build a car to compete in the Formula Student Malaysia (FSM) NxGV
        Challenge.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-navy">Mission</h2>
          <ul className="mt-3 space-y-3 text-sm text-gray-600">
            {missionPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="text-race-red">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-navy">Vision</h2>
          <p className="mt-3 text-sm text-gray-600">
            We are dedicated to advancing automotive innovation and
            sustainable mobility, contributing to a sustainable, electrified
            future in motorsports and transportation.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-navy">Our Project</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-lg border border-navy/10 bg-white p-6 shadow-sm"
            >
              <h3 className="font-bold text-race-red">{project.title}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
