export class User {
  constructor(date) {
    this.login = '';
    this.password = null;
    this.rememberMe = false;
    this.createdAt = date;
    this.tasks = [];
    this.stats = {
      finishedTasks: 0,
      avgTaskTime: 'finish some task first',
      avgBreakTime: 'no breaks so far',
      avgTasksPerDay: 0,
      dateCreated: this.getCreationDate(date),
      totalTaskTime: 0,
      totalBreakTime: 0,
    };
  }

  getCreationDate(date) {
    const dateTime = date
      .toISOString()
      .slice(0, 10)
      .split('-')
      .reverse()
      .join('-');
    const hourTime = date.toISOString().slice(11, 16);
    return `${dateTime} ${hourTime}`;
  }
}
