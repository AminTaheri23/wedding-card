export interface InvitationData {
  groom: string;
  bride: string;
  bodyText: string[];
  dateLabel: string;
  timeLabel: string;
  locationLabel: string;
}

export enum AppState {
  LOADING,
  READY,
  OPENING,
  OPENED
}

export interface LoadingScreenProps {
  progress: number;
}

export interface OrnamentProps {
  className?: string;
}
