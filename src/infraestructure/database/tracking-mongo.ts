import mongoose, { Schema, Document } from 'mongoose';
import { TrackingStatus } from '../../domain/entities/Tracking';

export interface ITrackingMongo extends Document {
  trackingNumber: string;
  orderNumber: string;
  userId: string;
  currentStatus: TrackingStatus;
  statusHistory: Array<{ status: TrackingStatus; timestamp: Date }>;
  notifications: Array<{ type: string; message: string; timestamp: Date; sent: boolean; retries: number }>;
}

const TrackingSchema: Schema = new Schema({
  trackingNumber: { type: String, required: true, unique: true },
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  currentStatus: { type: String, enum: Object.values(TrackingStatus), required: true },
  statusHistory: [
    {
      status: { type: String, enum: Object.values(TrackingStatus), required: true },
      timestamp: { type: Date, required: true }
    }
  ],
  notifications: [
    {
      type: { type: String },
      message: { type: String },
      timestamp: { type: Date },
      sent: { type: Boolean },
      retries: { type: Number }
    }
  ]
});

export default mongoose.model<ITrackingMongo>('Tracking', TrackingSchema);
