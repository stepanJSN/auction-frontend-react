import { Slider } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

type PriceSliderProps = {
  min: number;
  max: number;
  range: [number | null, number | null];
  handlePriceRangeChange: (
    _event: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => void;
};

const getPriceRangeAriaLabel = () => 'price range';

export default function PriceSlider({
  min,
  max,
  range,
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

  useEffect(() => {
    if (range[0] === min && range[1] === max) {
      setSliderValue([min, max]);
    }
  }, [range, min, max]);

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
