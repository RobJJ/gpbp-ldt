import versioningImage from "../../../public/versioning.png";
import Image from "next/image";

export const metadata = {
  title: "GED: Release Notes",
  description: "Green Economy Diagnostic Tool",
};

export default function ReleaseNotes() {
  return (
    <section className=" w-full h-full flex smlr:flex-col gap-1 overflow-auto bg-[#F5F8FB]">
      {/* LEFT PANEL */}
      <div className=" w-4/6 h-full p-8 flex flex-col gap-5 bg-[#F5F8FB]">
        <div className="text-3xl font-poppins">
          <b>Green Economy Development:</b> Release Notes
        </div>
        <div className="w-full h-full border-2 border-slate-400  bg-white overflow-auto unique-scrollbar">
          {/* Inner Box */}
          <div className="flex flex-col p-5 px-7 overflow-auto gap-10 font-inter">
            {/* UPDATE : v 0.6.4 - MINOR - Updated UI from snaglist  */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  Nov 6th 2023 | Version 0.6.4 beta
                </span>
                <span className="font-semibold text-xl">
                  Visual component patch
                </span>
              </div>
              <div className=" flex gap-5">
                <span className="rounded-full bg-[#E3FCEF] text-[#044630] px-4 p-1">
                  Patch
                </span>
              </div>
              <span className="">
                Addressed an event caching issue with the charting library that
                caused unusual navigation through administrative levels. In
                addition to this, added some new UI/UX improvements.
              </span>
            </div>
            {/* UPDATE : v 0.6.3 - MINOR - Updated UI from snaglist  */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  Sep 15th 2023 | Version 0.6.3 beta
                </span>
                <span className="font-semibold text-xl">
                  UI / UX Refinements
                </span>
              </div>
              <div className=" flex gap-5">
                <span className="rounded-full bg-[#FFF5CA] text-[#995300] px-4 p-1">
                  Minor
                </span>
              </div>
              <span className="">
                Visual tweaks / updates to various components through
                application - closer alignment to Figma design and the user
                feedback collected.
              </span>
            </div>
            {/* UPDATE : v 0.6.2 - MINOR - optimise visuals  */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  Aug 22nd 2023 | Version 0.6.2 beta
                </span>
                <span className="font-semibold text-xl">
                  Optimised Visual component performance
                </span>
              </div>
              <div className=" flex gap-5">
                <span className="rounded-full bg-[#FFF5CA] text-[#995300] px-4 p-1">
                  Minor
                </span>
                <span className="rounded-full bg-[#E3FCEF] text-[#044630] px-4 p-1">
                  Patch
                </span>
              </div>
              <span className="">
                Optimized the performance of key visual components - reduced
                client-side latency, and a more fluid and responsive user
                experience. Moreover, {"we've"} introduced new interactions for
                both province and district views, granting users the flexibility
                to toggle between their preferred viewing methods. These
                enhancements offer an improved user experience.
              </span>
            </div>
            {/* UPDATE : v 0.6 - MAJOR - new API and DB  */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  Aug 5th 2023 | Version 0.6 beta
                </span>
                <span className="font-semibold text-xl">
                  Enhanced API Layer and Multinational DB Cluster
                </span>
              </div>
              <div className=" flex gap-5">
                <span className="rounded-full bg-[#FFE6E7] text-[#BF0009] px-4 p-1">
                  Major
                </span>
                <span
                  className="rounded-full bg-[#E6EBFF] text-[#4344aA]
] px-4 p-1"
                >
                  Operational pre-release
                </span>
              </div>
              <span className="">
                {"We've"} introduced a Next.js API layer to simplify client
                requests and reduce load times for users. Additionally, our
                updated database cluster now consolidates country cubes in a
                mono repo, making it easier to scale and add new countries.
              </span>
            </div>
            {/* UPDATE : v 0.5 - NEXT JS  */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  July 19th 2023 | Version 0.5 beta
                </span>
                <span className="font-semibold text-xl">
                  Transition to Next.JS and a refined UI Design
                </span>
              </div>
              <div className=" flex gap-5">
                <span className="rounded-full bg-[#FFE6E7] text-[#BF0009] px-4 p-1">
                  Major
                </span>
                <span
                  className="rounded-full bg-[#E6EBFF] text-[#4344aA]
] px-4 p-1"
                >
                  Operational pre-release
                </span>
                <span className="rounded-full bg-[#FFF5CA] text-[#995300] px-4 p-1">
                  Minor
                </span>
              </div>
              <span className="">
                This strategic move was initiated to harness the power of
                Server-Side Rendering (SSR) provided by Next.js, which will
                significantly boost our {"application's"} performance.
                Additionally, this transition paves the way for easier
                scalability, especially as we expand to support new country
                cubes. Lastly, a new simplified UI/UX design helps users
                interact more intuitively with our application
              </span>
            </div>
            {/* UPDATE : v 0.3.3 - PATCH - Serbia  */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  July 6th 2023 | Version 0.3.3 beta
                </span>
                <span className="font-semibold text-xl  ">
                  District insights component added
                </span>
              </div>
              <div className=" flex gap-5">
                <span className="rounded-full bg-[#FFF5CA] text-[#995300] px-4 p-1">
                  Minor
                </span>
                <span className="rounded-full bg-[#E3FCEF] text-[#044630] px-4 p-1">
                  Patch
                </span>
                <span className="rounded-full bg-[#E6EBFF] text-[#4344aA] px-4 p-1">
                  Operational pre-release
                </span>
              </div>
              <span className="">
                Introducing the District Insights, <b>Experimental feature</b>,
                which aims to empower users with a comprehensive understanding
                of data and trends - accomplished by harnessing the power of AI
                LLMs. We believe this enhancement will enable users to make more
                informed decisions and extract valuable insights from our
                platform. This is a first step with the experimental component
                that will receive consistent updates and improvements.
              </span>
            </div>
            {/* UPDATE : v 0.3.2 - PATCH - UZB */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  June 1st 2023 | Version 0.3.2 beta
                </span>
                <span className="font-semibold text-xl  ">
                  New Country Support Added
                </span>
              </div>
              <div className=" flex gap-5">
                <span
                  className="rounded-full bg-[#E3FCEF] text-[#044630]
] px-4 p-1"
                >
                  Patch
                </span>
                <span
                  className="rounded-full bg-[#E6EBFF] text-[#4344aA]
] px-4 p-1"
                >
                  Operational pre-release
                </span>
              </div>
              <span className="">
                Bug fixes have enhanced stability and resolved reported issues,
                while optimizing the user journey. New country rendered.
                Application migrated to a new hosting location to improve
                response times for EUR users.
              </span>
            </div>
            {/* UPDATE : v 0.3.1 - PATCH */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  May 18th 2023 | Version 0.3.1 beta
                </span>
                <span className="font-semibold text-xl  ">
                  Bug Fixes and Performance Improvements
                </span>
              </div>
              <div className=" flex gap-5">
                <span className="rounded-full bg-[#FFF5CA] text-[#995300] px-4 p-1">
                  Minor
                </span>

                <span
                  className="rounded-full bg-[#E3FCEF] text-[#044630]
] px-4 p-1"
                >
                  Patch
                </span>
              </div>
              <span className="">
                During the recent patch, we successfully migrated our
                application to a new hosting environment, improving stability
                and scalability. We also made minor UI/UX changes to enhance the
                user experience. Additionally, we focused on resolving various
                bugs, resulting in increased performance. These updates aim to
                provide a more reliable and user-friendly application for our
                users.
              </span>
            </div>
            {/* UPDATE : v 0.3.0 */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  May 15th 2023 | Version 0.3.0 beta
                </span>
                <span className="font-semibold text-xl  ">
                  Enhanced operational prototype
                </span>
              </div>
              <div className=" flex gap-5">
                <span className="rounded-full bg-[#FFE6E7] text-[#BF0009] px-4 p-1">
                  Major
                </span>

                <span
                  className="rounded-full bg-[#E6EBFF] text-[#4344aA]
] px-4 p-1"
                >
                  Operational pre-release
                </span>
              </div>
              <span className="">
                Version 0.3 introduces notable enhancements. An improved system
                design delivers enhanced data and state management. The
                integration of a more capable charting library enhances data
                visualization, providing users with compelling and insightful
                visual representations. Iterations in design further refine the
                application aesthetics and user experience. Additionally, the
                introduction of a new landing page dedicated to country
                selection streamlines the user journey and implies future
                application intention.
              </span>

              <span className="font-semibold">
                Upcoming functionalities and changes:
              </span>
              <span className="">
                <li>
                  Improved Network Strategies - optimize data retrieval and
                  caching
                </li>
                <li>Improved Performance and Responsiveness</li>
                <li>
                  Enhanced Granularity of Environmental Metrics - for more
                  detailed analysis and insights
                </li>
              </span>
            </div>
            {/* UPDATE LATEST V.0.2.0 */}
            <div className="flex flex-col  gap-3">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  April 17th 2023 | Version 0.2.0 beta
                </span>
                <span className="font-semibold text-xl  ">
                  First operational prototype
                </span>
              </div>
              <div className=" flex gap-5">
                <span className="rounded-full bg-[#FFE6E7] text-[#BF0009] px-4 p-1">
                  Major
                </span>
                <span className="rounded-full bg-[#FFF5CA] text-[#995300] px-4 p-1">
                  Minor
                </span>
                <span className="rounded-full bg-[#E6EBFF] text-[#4344aA] px-4 p-1">
                  Operational pre-release
                </span>
              </div>
              <span className="">
                Version 0.2, the {"Green Economy Diagnostic"} empowers policy
                makers with valuable insights into economic and environmental
                performance. Integration of charting libraries and interactive
                maps enables informed decision-making and promotes sustainable
                practices. Comprehensive district summaries enhance access to
                detailed information, fostering positive change towards a
                greener future.
              </span>
              <span>
                The{" "}
                <a
                  className="underline text-red-500"
                  target="_blank"
                  rel="noreferrer"
                  href="https://gpbp.adamplatform.eu/"
                >
                  GPBP Climate Change Screening Tool
                </a>{" "}
                can be used to drill down into asset-level information on the
                environmental challenges facing public assets within districts.
              </span>
              <span className="font-semibold">
                Upcoming functionalities and changes:
              </span>
              <span className="">
                <li>
                  Enhanced Choropleth Map Visualization - improved granularity
                  in data representation.
                </li>
                <li>
                  Aligned Design and Branding - BDO-GPBP theme and branding
                </li>
                <li>
                  New Application Architecture and State Management System:
                </li>
                <li>
                  Advanced Charting Library - expanded functionality enabling
                  users to gain deeper insights
                </li>
                <li>
                  Implementation of new capable charting libraries, allowing for
                  deeper user interaction
                </li>
                <li>Improved Performance and Responsiveness</li>
              </span>
            </div>
            {/* UPDATE LATEST V.0.1 */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className=" text-slate-400">
                  January 18th 2023 | Version 0.1.0 beta
                </span>
                <span className="font-semibold text-xl ">
                  First theoretical pre-release prototype
                </span>
              </div>
              <div className="flex gap-5">
                <span className="rounded-full bg-[#FFE6E7] text-[#BF0009] px-4 p-1">
                  Major
                </span>

                <span className="rounded-full bg-[#E6EBFF] text-[#4344aA] px-4 p-1">
                  Operational pre-release
                </span>
              </div>
              <span className="pt-2">
                The Version 0.1 prototype serves as a simple starting point for
                the application development process. It is a basic demonstration
                of the core idea and visual design, lacking any functional
                capabilities. This initial iteration provides stakeholders and
                development teams with a tangible representation of the concept,
                allowing them to begin the collaborative journey and gather
                valuable feedback. While limited in functionality, the Version
                0.1 prototype sets the foundation for future iterations, guiding
                the application evolution towards its desired form.
              </span>

              <span className="pt-2">
                <li>
                  Functional Prototype: Version 0.2 will introduce a functional
                  prototype
                </li>
                <li>Charting Libraries</li>
                <li>
                  Mapping Library - provide a visual representation of
                  geographical data.
                </li>
                <li>
                  District Summary Pages - offering a comprehensive overview
                </li>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT PANEL */}
      <div className=" w-2/6 h-full flex flex-col p-4 gap-4 overflow-auto bg-white">
        <div className="text-3xl font-semibold w-full pt-5 font-poppins">
          What are release notes?
        </div>
        <div className="w-full font-inter">
          Versioning is a process of tracking changes to a database or software
          over time, allowing users to understand how the database has evolved
          and to easily roll back changes if necessary. As changes are made to
          the UI/UX of the database, it will be documented here in the release
          notes and this will include a brief description of the change, and the
          date it was made. We also use GitHub as the version control system to
          manage changes to the database by our developers. This allows us to
          track changes over time, roll back changes if necessary, and
          collaborate with others on the database.
        </div>
        <div className="h-full w-full">
          <Image src={versioningImage} alt="Versioning Info" />
        </div>
      </div>
    </section>
  );
}
