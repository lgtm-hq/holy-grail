/**
 * Download service utilities for Holy Grail documentation
 *
 * Handles file downloads and user notifications
 */

/**
 * Trigger a file download in the browser
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export type NotificationType = 'success' | 'error' | 'info';

const NOTIFICATION_ICONS: Record<NotificationType, string> = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
};

/**
 * Show a toast notification to the user
 */
export function showNotification(type: NotificationType, message: string): void {
  const notification = document.createElement('div');
  notification.className = `download-notification ${type}`;
  notification.innerHTML = `
    <span class="notification-icon" aria-hidden="true">${NOTIFICATION_ICONS[type]}</span>
    <span class="notification-text">${message}</span>
  `;
  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.classList.add('show');
  });

  // Remove after delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
