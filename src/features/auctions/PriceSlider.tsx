import { Slider } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

type PriceSliderProps = {
  min: number;
  max: number;
  handlePriceRangeChange: (
    _event: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => void;
};

const getPriceRangeAriaLabel = () => 'price range';

export default function PriceSlider({
  min,
  max,
  handlePriceRangeChange,
}: PriceSliderProps) {
  const [sliderValue, setSliderValue] = useState([min, max]);
  const priceRangeMarks = useMemo(
    () => [
      { value: min, label: min },
      { value: max, label: max },
    ],
    [max, min],
  );

  const handleSliderChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        setSliderValue(newValue);
      }
    },
    [],
  );

  return (
    <Slider
      getAriaLabel={getPriceRangeAriaLabel}
      value={sliderValue}
      onChange={handleSliderChange}
      onChangeCommitted={handlePriceRangeChange}
      valueLabelDisplay="auto"
      marks={priceRangeMarks}
      min={min}
      max={max}
    />
  );
}
