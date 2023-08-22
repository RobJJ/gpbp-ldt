import MethodologyNavigation from "@/components/methodology/navigation";
import airQualityImage from "../../../public/air_quality_breakdown.png";
import ContentEconomic from "@/components/methodology/content-econ";

export const metadata = {
  title: "GED: Methodology",
  description: "Green Economy Diagnostic Tool",
};

export default function MethodologyPage() {
  return (
    <div className="w-full h-full bg-slate-500 flex gap-2 overflow-auto">
      {/* Navigation section : Right */}
      <section className="bg-[#ECECEC] w-1/4 h-full flex flex-col gap-5 pt-14 pl-5 pr-3">
        <MethodologyNavigation />
      </section>
      {/* Content section : Left */}
      <section className="bg-white w-3/4 h-full px-14 pt-14 overflow-auto scroll-smooth">
        <main className="bg-blue-300 p-1 w-full h-full flex flex-col gap-5  font-inter">
          {/* Content section : 1 : ECON */}
          <div id="econ" className="bg-blue-200 w-full flex flex-col gap-4">
            <ContentEconomic />
          </div>
          {/* Content section : 2 : ENVR */}
          <div className="bg-blue-200 w-full flex flex-col">2</div>
          {/* Content section : 3 : SCHEMA */}
          <div className="bg-blue-200 w-full flex flex-col">3</div>
        </main>
      </section>
    </div>
  );
}

// <div className="flex px-16 pt-12 bg-slate-300 w-full h-full overflow-auto">
//       <main className="flex w-full h-full">
//         {/* Navigation : LEFT */}
//         <section className="h-full w-3/12 bg-blue-300 flex flex-col gap-5 pt-5 pl-8">
//           <h2 className="font-bold text-3xl">Methodology</h2>
//           <div className="text-lg font-semibold flex flex-col gap-2">
//             <a href="#section1">1. Summary</a>
//             <a href="#section2">2. Air Quality Index</a>
//             <a href="#section3">3. Extreme Weather Index</a>
//             <a href="#section4">4. Calculating overall Environmental Index</a>
//             <a href="#section5">5. Schema</a>
//           </div>
//         </section>
//         {/* Content : Right */}
//         <section className="h-full w-9/12 bg-red-300 px-8 pt-8 overflow-auto">
//           <main className="w-full h-full bg-red-200 flex flex-col gap-5 overflow-auto text-lg scroll-smooth">
//             <div id="section1">
//               <span className="font-bold text-xl">SECTION ONE</span>
//               <br />
//               {` Summary This document explains how an environmental score for
//               different regions is calculated. This score gives an idea of how
//               the environment is performing in a particular region, based on
//               various factors like air quality, temperature, precipitation, and
//               green spaces. Here's are the most important components: Air
//               Quality: This is measured by looking at five different types of
//               pollutants in the air. Each pollutant is scored on a scale of
//               0-500 (with higher scores indicating worse air quality). Then, the
//               score for the worst pollutant is chosen to represent overall air
//               quality. This number tells us about the air quality for every day
//               in the year, and then we determine the percentage of days per day
//               had good, moderate, or poor air quality . Weather: We look at the
//               temperature for every day in the past decade, find out the yearly
//               change in the maximum recorded temperature, what's "extremely hot"
//               (top 10%) and "extremely cold" (bottom 10%), and then see how many
//               such days there were in each year. Similarly, we also keep track
//               of the change in the maximum amount of rainfall in a year, and the
//               proportion of extremely wet or dry days. Green Space: We use
//               satellite images to see how much of a region is covered by green
//               spaces like forests, grass, and shrubs, and whether this is
//               increasing or decreasing over time. We also take a look at the
//               change in the region’s built environment when there’s a decrease
//               in green space After we have all this data, we need to combine it
//               into a single environmental score. But because these factors are
//               all different and affect the environment in different ways, we
//               can't just add them up. Instead, we use a method called Principal
//               Component Analysis (PCA) that finds the most important factors and
//               combines them into indices to represent the above components.
//               Finally, we take the weighted average of the scored components as
//               the environment score. The final score ranges from 0 to 100, where
//               higher scores represent a healthier environment. Some factors,
//               like good air quality or more green spaces, increase the score.
//               Others, like high levels of pollution or extreme temperatures,
//               decrease the score, although the relationship is not always linear`}
//             </div>
//             <div id="section2">
//               <span className="font-bold text-xl">SECTION TWO</span>
//               <br />
//               {`Air quality index
// We first calculate the Air Quality Index (AQI) based on the measurements of five pollutants: PM2.5, NO2, CO, SO2, and O3. We create sub-indexes for each of these pollutants. The concentration measurements of these pollutants are in different units, so they are first converted into a common scale. The methodology for the calculation follow those defined by the United States Environmental Protection Agency (EPA).`}
//             </div>
//             <div id="section3">
//               <span className="font-bold text-xl">SECTION THREE</span>
//               <br />
//               {`We take data on the average temperature of each region from 2000-2010 to determine the 90th and 10th percentile. We use this to identify a 'hot threshold' (90th percentile) and a 'cold threshold' (10th percentile).

// For each year, we count the number of days in each region where the average temperature was above the hot threshold (90th percentile). The number of these extremely hot days is then divided by the total number of days to get a ratio, representing the proportion of the year with extremely hot temperatures. Similarly, for each year, we count the number of days in each region where the average temperature was below the cold threshold (10th percentile). The number of these extremely cold days is then divided by the total number of days to get a ratio, representing the proportion of the year with extremely cold temperatures. We also take the annual percentage changes of the percentage of number of hot and cold days.

// We additionally compute the annual percentage change in the region’s maximum temperature`}
//             </div>
//             <div id="section4">
//               <span className="font-bold text-xl">SECTION FOUR</span>
//               <br />
//               {`We use day time satellite imagery to measure changes in green and built coverage from one year to another. Regions that experience large reductions in green space have lower scores, while regions that experience growth in green space have higher scores. Additionally, regions which have positive annual percentage changes in built coverage and a negative percentage changes in the green coverage will have lower scores, while having a positive annual percentage change in both coverages yield 0 impact to the forest score`}
//             </div>
//             <div id="section5">
//               <span className="font-bold text-xl">SECTION FIVE</span>
//               <br />
//               {`We then calculate an overall environmental score using Principal Component Analysis (PCA). PCA is an unsupervised learning technique that is used for ‘dimensionality reduction’. It transforms the original set of variables into a new set of uncorrelated variables, known as principal components.

// We calculate the overall environmental score by conducting PCA on the following variables:`}
//             </div>
//           </main>
//         </section>
//       </main>
//     </div>
