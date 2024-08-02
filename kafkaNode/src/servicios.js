
class Producersvc {

    
  
    generarKey() {
      return Math.floor(Math.random() * 100) + 1;
    }
  
    static generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
  
    static generateRandomUsers(count) {
      const users = [];
      for (let i = 0; i < count; i++) {
        users.push(Producersvc.generateRandomString(7));
      }
      return users;
    }
  
    static generateRandomItems(count) {
      const items = [];
      for (let i = 0; i < count; i++) {
        items.push(Producersvc.generateRandomString(5));
      }
      return items;
    }
  
    static getRandomElement(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  
    static generateRandomValue(users, items) {
      const user = Producersvc.getRandomElement(users);
      const item = Producersvc.getRandomElement(items);
      return `${user}-${item}`;
    }
  }
  
  module.exports = Producersvc;
  