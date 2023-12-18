import Image from "next/image";
import airQualityImage from "../../../public/air_quality_breakdown.png";
import EnvrTable from "./content-envr-table";
import Link from "next/link";

export default function ContentMethods() {
  return (
    <div className="flex flex-col gap-6">
      <div id="methods" className="w-full flex">
        <span className="text-2xl flex justify-center items-center w-[33px] h-[33px] bg-[#4345AA] text-white font-bold">
          2
        </span>
      </div>
      <h2 className="text-3xl text-[#4345AA] font-bold ">Methods</h2>
      {/* 2.1 */}
      <div className="flex flex-col gap-4 ">
        <h4 className="text-xl font-semibold" id="indicator-selection">
          2.1 Indicator Selection
        </h4>
        <p>
          We utilized a wide variety of geospatial, publicly available, and
          frequently updated
          <Link
            href={
              "https://docs.google.com/spreadsheets/d/1YgcIgIebj71lODs6rGbIyRutxBKLmvJK4WjVGjgT1Y4/edit?pli=1#gid=0"
            }
            alt="datasets"
            target="_blank"
            className="hover:text-[#4345AA] underline"
          >
            datasets
          </Link>
          to construct indicators that make up the Green Economy Diagnostics
          Tool&apos;s scores. The scalable and modular nature of these datasets
          allow us to rapidly deploy the GED for any country on demand. They
          were also chosen based on the availability and comprehensiveness of
          their technical documentation and existing validation work.
        </p>
        <p>
          Datasets were sought based on two themes: Economic Development and
          Environmental Performance.
        </p>
        <p>
          Economic Development indicators are to be taken as proxies of
          traditional economic indicators such as the Gross Domestic Output
          (GDP) which can be infrequently updated and limited in spatial
          granularity.
        </p>
        <p>
          Environmental Performance indicators were selected based on how they
          reflect a region&apos;s environmental conditions. They are further
          classified into three sub-domains: Air Pollution, Extreme Weather
          Conditions, and Green Space.
        </p>
      </div>
      {/* 2.2 */}
      <div className="flex flex-col gap-4 ">
        <h4 className="text-xl font-semibold" id="pca">
          2.2 Principal Component Analysis
        </h4>
        <p>
          The GED&apos;s Economic and Environmental Scores are each composed of
          several sub-scores. Since these sub-scores are constructed using many
          different metrics, with the prospect of additional metrics being
          incorporated in the future, we cannot just combine them by simple
          additions. Instead, we use a method called
          <Link
            href={
              "https://medium.com/m/global-identity-2?redirectUrl=https%3A%2F%2Ftowardsdatascience.com%2Fthe-most-gentle-introduction-to-principal-component-analysis-9ffae371e93b"
            }
            className="hover:text-[#4345AA] underline"
            target="_blank"
          >
            Principal Component Analysis (PCA)
          </Link>
          that extracts the most relevant information from these metrics and
          combines them into indices to represent the above components. PCA is
          endorsed by the OECD as a
          <Link
            href={
              "https://www.oecd-ilibrary.org/economics/handbook-on-constructing-composite-indicators_533411815016;jsessionid=147WcmBxPnJMSAP1ZXcer6rsh-lc-9Xll0SmeovW.ip-10-240-5-163"
            }
            className="hover:text-[#4345AA] underline"
            target="_blank"
          >
            recommended technique for constructing composite indicators
          </Link>
          . The values of the reduced indices from PCA are then normalized to a
          scale of 0-100.
        </p>
      </div>
      {/* 2.3 */}
      <div className="flex flex-col gap-4 ">
        <h4 className="text-xl font-semibold" id="econ-score-review">
          2.3 Economic Score Overview
        </h4>
        <p>
          This section presents the methodology for calculating an economic
          score for different regions which aims to represent their levels of
          economic development. It is based on two factors, each measures
          economic development from different perspectives: utility and the
          built area coverage. <br />
          Here are the crucial components:
        </p>
        <ul>
          <li className="ml-2">
            1. Utility: Comprised of nighttime luminosity and luminosity annual
            growth. They are computed from data measured using satellite
            imagery, and they serve as a useful proxy for electricity
            consumption and economic activity.
          </li>
          <li className="ml-2">
            2. Built Area: We use satellite images to see how much of a region
            is covered by man-made structures and whether this is increasing or
            decreasing over time. The presence of man-made structures is a good
            indicator of economic activity
          </li>
        </ul>
        <p>
          Finally, we use Principle Component Analysis to construct the above
          individual components of the Economic Score. we take the weighted
          average of the scored components/indices as the economic score. This
          score spans from 0 to 100, with higher values denoting a more robust
          and productive economy. This is indicative of a positive economic
          development in the region Conversely, lower scores could signal
          economic slowdown or stagnation in the region. The economic score thus
          gives us an overall snapshot of the region's economic health and
          trajectory.
        </p>
        <h4 className="text-md font-semibold" id="2.3.1">
          2.3.1 Utility Score Calculations
        </h4>
        <ul className="ml-2">
          <li>
            1. Luminosity data processing: The raw luminosity data is gathered
            from the NASA Black Marble VIIRS dataset. It is, then, further
            processed using{" "}
            <Link
              href="https://505economics.com/"
              alt="505 Economics website"
              className="underline hover:text-[#4345AA]"
              target="_blank"
            >
              505Economics&apos;
            </Link>{" "}
            algorithm.
          </li>
          <li>
            2. Zonal statistics: We take the sum of nighttime luminosity values
            of the pixels comprising the chosen region for every year with
            available data.
          </li>
          <li>
            3. Luminosity Growth Rate Calculation: The luminosity growth rate is
            calculated as (Current Year Luminosity - Previous Year Luminosity) /
            Previous Year Luminosity.
          </li>
          <li>
            4. Utility Score Calculation: The luminosity and luminosity growth
            rate are standardized (subtracting the mean and scaling to unit
            variance) and transformed into the Utility Score using Principal
            Component Analysis. The individual scores are then grouped by year
            and ranked relative to the 0-100 scale.
          </li>
        </ul>
        <h4 className="text-md font-semibold" id="2.3.2">
          2.3.2 Built Area Calculations
        </h4>
        <ul className="ml-2">
          <li>
            1. Land cover data processing: The raw Dynamic World V1 land cover
            data is extracted using Google Earth Engine. The mode of the annual
            pixel classification value is taken.
          </li>
          <li>
            2. Zonal Statistics: The percentage of the pixels labelled “built
            area” (human built structures) in a chosen region for a chosen year
            is calculated.
          </li>
          <li>
            3. Built Area Growth Calculation: The Built Area Annual Growth is
            then calculated as (Current Year Built Area Coverage - Previous Year
            Built Area Coverage) / Previous Year Built Area Coverage.
          </li>
          <li>
            4. Built Area Score Calculation: The Built Area Coverage and Built
            Area growth rate are standardized (subtracting the mean and scaling
            to unit variance) and transformed into the Built Area Score using
            Principal Component Analysis. The individual scores are then grouped
            by year and ranked relative to the 0-100 scale.
          </li>
        </ul>
        <h4 className="text-md font-semibold" id="2.3.3">
          2.3.3 Economic Score Calculations
        </h4>
        <p>
          The Economic Score is calculated using the weighted average of a given
          region at a given year&apos;s Utility and Built Area Scores. The
          weights are set to be equal. The individual scores are then grouped by
          year and ranked relative to the 0-100 scale.
        </p>
      </div>
      {/* 2.4 */}
      <div className="flex flex-col gap-4 ">
        <h4 className="text-xl font-semibold" id="env-score-overview">
          2.4 Environmental Score Overview
        </h4>
        <p>
          This section explains how an environmental score for different regions
          is calculated. This score gives an idea of how the environment is
          performing in a particular region, based on various factors like air
          quality, temperature, precipitation, and green spaces. <br />
          Here's are the most important components:
        </p>
        <ul className="ml-2">
          <li>
            1. Air Quality: This is measured by looking at five different types
            of pollutants in the air. Each pollutant is scored on a scale of
            0-500 (with higher scores indicating worse air quality). Then, the
            score for the worst pollutant is chosen to represent overall air
            quality. This number tells us about the air quality for every day in
            the year, and then we determine the percentage of days per day had
            good, moderate, or poor air quality.
          </li>
          <li>
            2. Weather: We look at the temperature for every day in the past
            decade, find out the yearly change in the maximum recorded
            temperature, what's "extremely hot" (top 10%) and "extremely cold"
            (bottom 10%), and then see how many such days there were in each
            year. Similarly, we also keep track of the change in the maximum
            amount of rainfall in a year, and the proportion of extremely wet or
            dry days.
          </li>
          <li>
            3. Green Space: We use satellite images to see how much of a region
            is covered by green spaces like forests, grass, and shrubs, and
            whether this is increasing or decreasing over time. We also take a
            look at the annual change in the region&apos;s built environment
            when there&apos;s a decrease in green space
          </li>
        </ul>
        <p>
          Similarly to the components of the Economic Score, we use Principle
          Component Analysis to construct the individual components of the
          Environment Score. Their weighted average are then computed as the
          Environment Score, where higher scores represent a healthier
          environment. Some factors, like good air quality or more green spaces,
          increase the score. Others, like high levels of pollution or extreme
          temperatures, decrease the score, although the relationship is not
          always linear.
        </p>
        <h4 className="text-md font-semibold" id="2.4.1">
          2.4.1 Air Quality Score
        </h4>
        <p>
          We first calculate the Air Quality Index (AQI) based on the
          measurements of five pollutants: PM2.5, NO2, CO, SO2, and O3. We
          create sub-indexes for each of these pollutants. The concentration
          measurements of these pollutants are in different units, so they are
          first converted into a common scale. The methodology for the
          calculation follow those defined by the United States Environmental
          Protection Agency (EPA).
        </p>
        <div className="flex justify-center items-center">
          <Image
            src={airQualityImage}
            alt="Air Quality Calculation Breadown"
            className="my-5"
          />
        </div>
        <span>
          1. <b>PM2.5 Sub-Index Calculation:</b> The PM2.5 values are measured
          in µg/m³. These are then re-scaled to create a value between 0-500
          (based on guidance from the EPA). The PM2.5 Sub-Index value is a
          scaled representation of the PM2.5 concentration.
        </span>
        <span>
          2. <b>NO2 Sub-Index Calculation:</b> The NO2 values are expressed in
          parts per billion (PPB). These are then re-scaled to create a value
          between 0-500 (based on guidance from the EPA). The NO2 sub-index is a
          scaled representation of the NO2 concentration.
        </span>
        <span>
          3. <b>CO Sub-Index Calculation:</b> The CO is expressed in mg / m3
          (milligrams per cubic meter of air). These are then re-scaled to
          create a value between 0-500 (based on guidance from the EPA). The CO
          Sub-Index is a scaled representation of the CO concentration.
        </span>
        <span>
          4. <b>SO2 Sub-Index Calculation:</b> The SO2 values are expressed in
          ug / m3 (micrograms per cubic meter of air). These are then re-scaled
          to create a value between 0-500 (based on guidance from the EPA). The
          SO2 Sub-Index is a scaled representation of the SO2 concentration.
        </span>
        <span>
          5. <b>O3 Sub-Index Calculation:</b> O3 is measured in ug / m3
          (micrograms per cubic meter of air). These are then re-scaled to
          create a value between 0-500 (based on guidance from the EPA). The O3
          Sub-Index is a scaled representation of the O3 concentration.
        </span>
        <span>
          6. <b>Final AQI Calculation:</b> The final Air Quality Index (AQI) is
          a single number summarizing air quality, calculated from five
          pollutant sub-indices: PM2.5, SO2, NO2, CO, and O3.
        </span>
        <ul className="flex flex-col gap-2">
          <h4>The AQI calculation follows two rules:</h4>
          <div>
            <li>
              <span className="mr-2 text-lg">&#x2022;</span>
              <b>Rule 1:</b> The PM2.5 or PM10 sub-index must be available, as
              particulate matter significantly impacts human health.
            </li>
            <li>
              <span className="mr-2 text-lg">&#x2022;</span>
              <b>Rule 2:</b> At least three out of the five total sub-indices
              must be available to ensure the AQI reflects various pollutants.
            </li>
          </div>
        </ul>
        <p>
          If these conditions {"aren't"} met, the AQI is set as {"'NaN'"} (i.e.
          it&apos;s a missing value), a marker indicating an undefined value.
        </p>
        <p>
          The final AQI itself is calculated as the maximum value of these
          sub-indices. This means that the AQI reflects the level of the most
          problematic pollutant at that time.
        </p>
        <div className="w-full bg-[#DEEDFF] flex justify-center items-center py-7 px-16 my-5 rounded">
          <p className="italic text-center">
            For example, if the NO2 level is higher than the other pollutants,
            the NO2 sub-index will be the final AQI score. This is done because
            the health effects of the worst pollutant are considered to
            represent the overall air quality.
          </p>
        </div>
        <p>
          AQI values are on a scale from 0 to 500, where a higher value
          indicates poorer air quality with greater potential impact on human
          health. AQI scores are as follows:
        </p>
        <ul className="ml-2">
          <li>
            <span className="mr-2 text-lg">&#x2022;</span>0 to 50 represents
            good air quality
          </li>
          <li>
            <span className="mr-2 text-lg">&#x2022;</span>
            51 to 100 is satisfactory
          </li>
          <li>
            <span className="mr-2 text-lg">&#x2022;</span>101 to 200 is moderate
          </li>
          <li>
            <span className="mr-2 text-lg">&#x2022;</span>
            201 to 300 is poor
          </li>
          <li>
            <span className="mr-2 text-lg">&#x2022;</span>
            301 to 400 is very poor
          </li>
          <li>
            <span className="mr-2 text-lg">&#x2022;</span>
            401 to 500 is severe
          </li>
        </ul>
        <p>
          For each year, we then count the number of days each sub-national
          region experiences for each level of AQI (i.e. good, satisfactory,
          moderate, poor, very poor or severe). The percentage of days of a
          given region in a given year that fall into each AQI category is
          calculated.
        </p>
        <p>
          Finally, we compute the Air Quality Score by applying PCA to metrics
          representing the percentage of days a region experiences different
          levels of AQI and the annual growth rates of individual air pollutants
          (NO2, CO, SO2, O3, and PM 2.5). The individual scores are then grouped
          by year and ranked relative to the 0-100 range.
        </p>
        <h4 className="text-md font-semibold" id="2.4.2">
          2.4.2 Extreme Weather Score
        </h4>
        <span className=" ml-2 italic">1. Extreme Temperatures:</span>
        <p>
          We take data on the average temperature of each region from 2000-2010
          to determine the 90th and 10th percentile. We use this to identify a
          'hot threshold' (90th percentile) and a 'cold threshold' (10th
          percentile).
        </p>
        <p>
          For each year, we count the number of days in each region where the
          average temperature was above the hot threshold (90th percentile). The
          number of these extremely hot days is then divided by the total number
          of days to get a ratio, representing the proportion of the year with
          extremely hot temperatures. Similarly, for each year, we count the
          number of days in each region where the average temperature was below
          the cold threshold (10th percentile). The number of these extremely
          cold days is then divided by the total number of days to get a ratio,
          representing the proportion of the year with extremely cold
          temperatures. We also take the annual percentage changes of the
          percentage of number of hot and cold days.
        </p>
        <p>
          We additionally compute the annual percentage change in the
          region&apos;s maximum temperature.
        </p>
        <span className=" ml-2 italic">2. Extreme Precipitation:</span>
        <p>
          We take data on the average precipitation of each region from
          2000-2010 to determine the 90th and 10th percentile. We use this to
          identify a 'wet threshold' (90th percentile) and a 'dry threshold'
          (10th percentile).
        </p>
        <p>
          For each year, we count the number of days in each region where the
          average precipitation was above the wet threshold (90th percentile).
          The number of these extremely wet days is then divided by the total
          number of days to get a ratio, representing the proportion of the year
          with extremely high precipitation. Similarly, for each year, we count
          the number of days in each region where the average temperature was
          below the dry threshold (10th percentile). The number of these
          extremely dry days is then divided by the total number of days to get
          a ratio, representing the proportion of the year with extremely low
          precipitation. We also take the annual percentage changes of the
          percentage of number of wet and dry days.
        </p>
        <p>
          We additionally compute the annual percentage change in the
          region&apos;s maximum precipitation.
        </p>
        <span className=" ml-2 italic">
          3. Extreme Weather score calculation:
        </span>
        <p>
          We apply PCA on these metrics to produce the Extreme Weather score.
          The individual scores are then grouped by year and ranked relative to
          the 0-100 range.
        </p>
        <h4 className="text-md font-semibold" id="2.4.3">
          2.4.3 Green Space Score
        </h4>
        <ul className="ml-2">
          <li>
            1. Land cover data processing: The raw Dynamic World V1 land cover
            data is extracted using Google Earth Engine. The mode of the annual
            pixel classification value is taken.
          </li>
          <li>
            2. Zonal Statistics: The percentage of the pixels labelled which
            classify as “green space” (forest, shrubs and scrubs, grass) in a
            chosen region for a chosen year is calculated.
          </li>
          <li>
            3. Green Space Growth Calculation: The Green Space Annual Growth is
            then calculated as (Current Year Green Space Coverage - Previous
            Year Green Space Coverage) / Previous Year Green Space Coverage.
          </li>
          <li>
            4. Green Space Score Calculation: The Green Space Coverage, Green
            Space growth rate, and Built Area growth rate are standardized
            (subtracting the mean and scaling to unit variance) and transformed
            into the Built Area Score using Principal Component Analysis.
            Regions which have positive annual percentage changes in built
            coverage and a negative percentage changes in the green coverage has
            its built coverage value multiplied by -1. The individual scores are
            then grouped by year and ranked relative to the 0-100 scale.
          </li>
        </ul>
        <h4 className="text-md font-semibold" id="2.4.4">
          2.4.4 Environmental Score Calculations
        </h4>
        <p>
          The Environment Score is calculated using the weighted average of a
          given region at a given year&apos;s Air Quality, Extreme Weather, and
          Green Space Scores. The weights are set to be equal. The individual
          scores are then grouped by year and ranked relative to the 0-100
          scale.
        </p>
        <p>
          We calculate the overall environmental score using the following
          variables:
        </p>
        <div className="w-full">
          <EnvrTable />
        </div>
        <p>
          These indicators are first standardized to have a mean of 0 and
          standard deviation of 1, and then principal component analysis (PCA)
          is used to combine them into their respective component scores. This
          is done to reduce dimensionality and deal with multicollinearity among
          the variables. After PCA, the weighted average of the component scores
          are computed as the environmental score.
        </p>
        <p>
          Note that indicators which are harmful for environment (like high
          ozone or PM2.5 levels, or extreme temperatures) are multiplied by -1
          before analysis so that they decrease, not increase, the environmental
          score.
        </p>
      </div>
    </div>
  );
}
