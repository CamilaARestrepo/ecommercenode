// src/test/domain/notifications/notification-dispatcher.test.ts

import { notificationDispatcher, NotificationEvent } from '../../../domain/notifications/notification-dispatcher';

describe('Notification Dispatcher', () => {
    beforeEach(() => {
        // Clear any existing handlers
        (notificationDispatcher as any).handlers = [];
    });

    describe('register', () => {
        it('should register a handler function', () => {
            const handler = jest.fn();
            
            notificationDispatcher.register(handler);
            
            expect((notificationDispatcher as any).handlers).toContain(handler);
        });

        it('should register multiple handlers', () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();
            
            notificationDispatcher.register(handler1);
            notificationDispatcher.register(handler2);
            
            expect((notificationDispatcher as any).handlers).toHaveLength(2);
            expect((notificationDispatcher as any).handlers).toContain(handler1);
            expect((notificationDispatcher as any).handlers).toContain(handler2);
        });
    });

    describe('dispatch', () => {
        it('should call all registered handlers with the event', async () => {
            const handler1 = jest.fn().mockResolvedValue(undefined);
            const handler2 = jest.fn().mockResolvedValue(undefined);
            
            notificationDispatcher.register(handler1);
            notificationDispatcher.register(handler2);
            
            const event: NotificationEvent = {
                type: 'test.notification',
                payload: { message: 'test' }
            };
            
            await notificationDispatcher.dispatch(event);
            
            expect(handler1).toHaveBeenCalledWith(event);
            expect(handler2).toHaveBeenCalledWith(event);
        });

        it('should handle handler errors gracefully', async () => {
            const handler1 = jest.fn().mockRejectedValue(new Error('Handler error'));
            const handler2 = jest.fn().mockResolvedValue(undefined);
            
            notificationDispatcher.register(handler1);
            notificationDispatcher.register(handler2);
            
            const event: NotificationEvent = {
                type: 'test.notification',
                payload: { message: 'test' }
            };
            
            // Should not throw even if one handler fails
            await expect(notificationDispatcher.dispatch(event)).resolves.not.toThrow();
            
            expect(handler1).toHaveBeenCalledWith(event);
            expect(handler2).toHaveBeenCalledWith(event);
        });

        it('should work with no registered handlers', async () => {
            const event: NotificationEvent = {
                type: 'test.notification',
                payload: { message: 'test' }
            };
            
            await expect(notificationDispatcher.dispatch(event)).resolves.not.toThrow();
        });
    });

    describe('handler error handling', () => {
        it('should handle handler errors gracefully', async () => {
            const handler1 = jest.fn().mockRejectedValue(new Error('Handler error'));
            const handler2 = jest.fn().mockResolvedValue(undefined);
            
            notificationDispatcher.register(handler1);
            notificationDispatcher.register(handler2);
            
            const event: NotificationEvent = {
                type: 'test.notification',
                payload: { message: 'test' }
            };
            
            // Should not throw even if one handler fails
            await expect(notificationDispatcher.dispatch(event)).resolves.not.toThrow();
            
            expect(handler1).toHaveBeenCalledWith(event);
            expect(handler2).toHaveBeenCalledWith(event);
        });
    });
});
