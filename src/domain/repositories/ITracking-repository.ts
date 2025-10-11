import { ITracking } from '../models/interfaces/ITracking';
import { TrackingStatus } from '../entities/Tracking';

export interface ITrackingRepository {
  createTracking(tracking: ITracking): Promise<ITracking>;
  getTrackingByOrderNumber(orderNumber: string, userId: string): Promise<ITracking | null>;
  updateTrackingStatus(trackingNumber: string, status: TrackingStatus): Promise<ITracking>;
  addNotification(trackingNumber: string, notification: any): Promise<void>;
}
