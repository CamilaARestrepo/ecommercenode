import TrackingModel, { ITrackingMongo } from '../database/tracking-mongo';
import { ITrackingRepository } from '../../domain/repositories/ITracking-repository';
import { ITracking } from '../../domain/models/interfaces/ITracking';
import { TrackingStatus } from '../../domain/entities/Tracking';

export class MongoTrackingRepository implements ITrackingRepository {
  async createTracking(tracking: ITracking): Promise<ITracking> {
    const created = await TrackingModel.create(tracking);
    return created.toObject();
  }

  async getTrackingByOrderNumber(orderNumber: string, userId: string): Promise<ITracking | null> {
    const found = await TrackingModel.findOne({ orderNumber, userId });
    return found ? found.toObject() : null;
  }

  async updateTrackingStatus(trackingNumber: string, status: TrackingStatus): Promise<ITracking> {
    const updated = await TrackingModel.findOneAndUpdate(
      { trackingNumber },
      { $set: { currentStatus: status }, $push: { statusHistory: { status, timestamp: new Date() } } },
      { new: true }
    );
    return updated.toObject();
  }

  async addNotification(trackingNumber: string, notification: any): Promise<void> {
    await TrackingModel.findOneAndUpdate(
      { trackingNumber },
      { $push: { notifications: notification } }
    );
  }
}
