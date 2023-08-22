export default function ContentEconomic() {
  return (
    <>
      <div className="w-full flex">
        <span className="text-2xl text-center w-[33px] h-[33px] bg-[#4345AA] text-white font-bold">
          1
        </span>
      </div>
      <h2 className="text-3xl text-[#4345AA] font-bold ">
        Economic Score Overview
      </h2>
      <p>
        This section presents the methodology for calculating an economic score
        for different regions. The score is based on two primary factors:
        luminosity per capita and the growth rate of luminosity per capita,
        giving an insight into the economic performance of a particular region.
      </p>
      <h3 className="text-xl text-[#4345AA] font-bold">
        Here are the crucial components:
      </h3>
      <p>
        <b>Luminosity Per Capita:</b> Luminosity per capita, measured using
        satellite imagery, serves as a useful proxy for economic activity. We
        determine the average luminosity per person for each region annually.
      </p>
      <p>
        <b>Luminosity Growth Rate:</b> This is the annual percentage change in
        luminosity per capita for a region. This metric allows us to capture
        changes in economic activity over time.
      </p>
      <p>
        <b>Built Area Coverage:</b> We use satellite images to see how much of a
        region is covered by man-made structures and whether this is increasing
        or decreasing over time. The presence of man-made structures is a good
        indicator of economic activity{" "}
      </p>
      <p>
        Once we have this data, we combine the two components into a single
        economic score. But because these factors are all different and affect
        the environment in different ways, we {"can't"} just add them up.
        Instead, we use a method called Principal Component Analysis (PCA) that
        finds the most important factors and combines them into indices to
        represent the above components. Finally, we take the weighted average of
        the scored components as the economic score. The score ranges from 0 to
        100, where higher scores represent a more productive economy. An
        increase in luminosity per capita generally indicates growth in economic
        activity, which would raise the score. Conversely, a decrease in
        luminosity or a slower growth rate will lower the score. Similar logic
        could be applied to the built area coverage.
      </p>
      <h3 className="text-xl text-[#4345AA] font-bold">Detailed steps:</h3>
      <div className="flex flex-col gap-2 w-full">
        <h4 className="text-xl font-semibold">
          1.1 Luminosity Per Capita calculations
        </h4>
        <p>
          We calculate the luminosity per capita by dividing the total
          luminosity of a region by its population. This measure provides a
          rough estimate of economic activity per person.
        </p>
        <span>
          1. Total Luminosity Calculation: The total luminosity data is gathered
          from the NASA Black Marble VIIRS dataset. It measures the intensity of
          nighttime lights for pixels of ~500mX500m. We sum up these values to
          get the total luminosity for each region.
        </span>
        <span>
          2. Population Data: We get the population data for each region from
          official census reports or estimates.
        </span>
        <span>
          3. Luminosity Per Capita Calculation: Finally, we divide the total
          luminosity by the population to get the luminosity per capita.
        </span>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h4 className="text-xl font-semibold">
          1.2 Luminosity Growth Rate calculations
        </h4>
        <p>
          The luminosity growth rate represents the annual percentage change in
          luminosity per capita. It is a measure of how the economic activity of
          a region has changed from the previous year.
        </p>
        <span>
          1. Previous Year Luminosity Per Capita: We store the luminosity per
          capita for each region for every year.
        </span>
        <span>
          2. Current Year Luminosity Per Capita: We also calculate the
          luminosity per capita for the current year.
        </span>
        <span>
          3. Luminosity Growth Rate Calculation: The luminosity growth rate is
          then calculated as (Current Year Luminosity Per Capita - Previous Year
          Luminosity Per Capita) / Previous Year Luminosity Per Capita * 100%.
        </span>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h4 className="text-xl font-semibold">
          1.3 Built Area Percentage calculations
        </h4>
        <p>
          The Built Area Percentage Change represents the annual percentage
          change in the selected locality’s built area percentage.
        </p>
        <span>
          1. Previous Year Built Area Coverage: We store the percentage of area
          covered by man-made structures for the previous year
        </span>
        <span>
          2. Current Year Built Area Coverage: We store the percentage of area
          covered by man-made structures for the current year
        </span>
        <span>
          3. Built Area Growth Calculation: The Built Area Growth is then
          calculated as (Current Year Built Area Coverage - Previous Year Built
          Area Coverage) / Previous Year Built Area Coverage * 100%.
        </span>
      </div>
      <h3 className="text-xl text-[#4345AA] font-bold">
        Calculating the overall economic score
      </h3>
      <div className="w-full flex flex-col gap-2">
        <p>
          We then calculate an overall economic score using Principal Component
          Analysis. Each variable is assigned a weight based on how much it
          contributes to account for the score’s variance (how much it
          contributes in determining the score).
        </p>
        <p>
          The final score ranges from 0 to 100, with higher scores indicating a
          more robust economy. This is indicative of a positive economic
          development in the region Conversely, lower scores could signal
          economic slowdown or stagnation in the region. The economic score thus
          gives us an overall snapshot of the {"region's"} economic health and
          trajectory.
        </p>
      </div>
    </>
  );
}
