'use client';

import {
  Label,
  Slider as AriaSlider,
  SliderOutput,
  SliderTrack,
  SliderThumb,
} from 'react-aria-components';
import { cn } from '../../utils/cn';
import type { SliderProps } from './Slider.types';

export function Slider({
  label,
  showOutput = true,
  thumbLabels,
  classNames,
  orientation,
  isDisabled,
  children,
  ...props
}: SliderProps) {
  return (
    <AriaSlider
      orientation={orientation}
      isDisabled={isDisabled}
      className={cn(
        'data-[orientation="horizontal"]:w-full data-[orientation="horizontal"]:flex data-[orientation="horizontal"]:flex-wrap',
        'data-[orientation="vertical"]:w-8 data-[orientation="vertical"]:block data-[orientation="vertical"]:h-full',
        classNames?.base
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children || (
        <>
          {(label || showOutput) && (
            <div
              className={cn(
                'w-full flex justify-between items-center',
                orientation === 'vertical' && 'gap-2 w-max mb-2',
                classNames?.outputWrapper
              )}
            >
              <Label
                className={cn(
                  'flex-1 text-sm',
                  isDisabled && 'opacity-50',
                  classNames?.label
                )}
              >
                {label}
              </Label>

              {showOutput && (
                <SliderOutput
                  className={cn(
                    'flex flex-initial ml-auto justify-end text-sm',
                    isDisabled && 'opacity-50',
                    classNames?.output
                  )}
                >
                  {({ state }) =>
                    state.values
                      .map((_, i) => state.getThumbValueLabel(i))
                      .join(' – ')
                  }
                </SliderOutput>
              )}
            </div>
          )}

          <SliderTrack
            className={cn(
              'data-[orientation="horizontal"]:w-full data-[orientation="horizontal"]:h-8',
              'data-[orientation="vertical"]:w-8 data-[orientation="vertical"]:h-full',
              'transition-all duration-200 ease',
              'before:bg-slate-300 before:block before:absolute cursor-pointer',
              'data-[orientation="horizontal"]:before:w-full data-[orientation="horizontal"]:before:h-0.5',
              'data-[orientation="horizontal"]:before:top-1/2 data-[orientation="horizontal"]:before:-translate-y-1/2',
              'data-[orientation="vertical"]:before:w-0.5 data-[orientation="vertical"]:before:h-full data-[orientation="vertical"]:before:left-1/2 data-[orientation="vertical"]:before:-translate-y-1/2 data-[orientation="vertical"]:before:-translate-x-1/2',
              isDisabled && 'opacity-50 before:cursor-default',
              classNames?.track
            )}
          >
            {({ state }) =>
              state.values.map((_, i) => (
                <SliderThumb
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  index={i}
                  aria-label={thumbLabels?.[i]}
                  className={cn(
                    'w-6 h-6 bg-slate-300 forced-color-adjust-none cursor-pointer top-1/2',
                    'border-2 border-slate-400 rounded-full',
                    isDisabled && 'cursor-default',
                    orientation === 'vertical' && 'left-1/2',
                    classNames?.thumb
                  )}
                />
              ))
            }
          </SliderTrack>
        </>
      )}
    </AriaSlider>
  );
}

export default Slider;
