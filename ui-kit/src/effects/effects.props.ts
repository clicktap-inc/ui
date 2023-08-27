export interface BoxShadowProps {
  shadow?: string;
  shadowColor?: string;
}

export interface OpacityProps {
  opacity?:
    | 0
    | 5
    | 10
    | 20
    | 25
    | 30
    | 40
    | 50
    | 60
    | 70
    | 75
    | 80
    | 90
    | 95
    | 100;
}

export interface BlendModes {
  mixBlend?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'
    | 'plus-lighter';
  bgBlend?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity';
}

export interface EffectsProps
  extends BlendModes,
    OpacityProps,
    BoxShadowProps {}
