import { ITrackingRepository } from '../repositories/ITracking-repository';
import { CreateTrackingDTO, UpdateTrackingStatusDTO } from '../../application/dtos/tracking-dtos';
import { TrackingStatus } from '../entities/Tracking';

export class TrackingService {
  constructor(private trackingRepo: ITrackingRepository) {}

  async createTracking(dto: CreateTrackingDTO, changedBy?: string) {
    // Generar trackingNumber secuencial por día usando mongoose-sequence
    const date = new Date();
    const dateStr = date.toISOString().slice(0,10).replace(/-/g, '');
    const tracking = {
      orderNumber: dto.orderNumber,
      userId: dto.userId,
      currentStatus: TrackingStatus.PENDIENTE,
      statusHistory: [{ status: TrackingStatus.PENDIENTE, timestamp: new Date(), changedBy: changedBy || 'System' }],
      notifications: [],
      trackingDate: dateStr
    };
    // El trackingSeq se asigna automáticamente por mongoose-sequence
    const created = await this.trackingRepo.createTracking(tracking, changedBy);
    // Generar trackingNumber: TRK-YYYYMMDD-XXXXX
    created.trackingNumber = `TRK-${created.trackingDate}-${String(created.trackingSeq).padStart(5, '0')}`;
    // Actualizar el tracking con el trackingNumber generado
    // Si el repo lo permite, actualiza el campo trackingNumber
    return created;
  }

  async getTracking(orderNumber: string) {
    return await this.trackingRepo.getTrackingByOrderNumber(orderNumber);
  }

  async updateStatus(dto: UpdateTrackingStatusDTO, changedBy?: string) {
    return await this.trackingRepo.updateTrackingStatus(dto.trackingNumber, dto.status, changedBy);
  }

  async addNotification(trackingNumber: string, notification: any) {
    await this.trackingRepo.addNotification(trackingNumber, notification);
  }
}
