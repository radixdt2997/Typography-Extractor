/**
 * Core typography analysis types
 */
export interface TypographyElement {
  readonly id: string;
  readonly tagName: string;
  readonly text: string;
  readonly styles: TypographyStyles;
  readonly position: ElementPosition;
  readonly computedStyles: ComputedStyles;
}

export interface TypographyStyles {
  readonly fontFamily: string;
  readonly fontSize: string;
  readonly fontWeight: string;
  readonly lineHeight: string;
  readonly color: string;
  readonly letterSpacing: string;
  readonly textAlign: string;
  readonly textTransform: string;
  readonly fontStyle: string;
  readonly textDecoration: string;
  readonly fontVariant: string;
}

export interface ElementPosition {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface ComputedStyles {
  readonly marginTop: string;
  readonly marginBottom: string;
  readonly paddingTop: string;
  readonly paddingBottom: string;
}

export interface TypographySummary {
  readonly totalElements: number;
  readonly uniqueFonts: readonly string[];
  readonly fontSizes: readonly string[];
  readonly colors: readonly string[];
  readonly fontWeights: readonly string[];
  readonly textAlignments: readonly string[];
}

export interface AnalysisMetadata {
  readonly pageTitle: string;
  readonly viewport: Viewport;
  readonly analysisTime: number;
}

export interface Viewport {
  readonly width: number;
  readonly height: number;
}

export interface TypographyData {
  readonly url: string;
  readonly timestamp: string;
  readonly screenshot: string;
  readonly elements: readonly TypographyElement[];
  readonly summary: TypographySummary;
  readonly metadata: AnalysisMetadata;
}