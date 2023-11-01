const request = require('supertest');
const app = require('../app'); // Replace with the path to your Express app

describe('API Tests', () => {
  it('should retrieve all items', (done) => {
    request(app)
      .get('/api/items')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should create a new item', (done) => {
    request(app)
      .post('/api/items')
      .send({ name: 'New Item' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should delete an item', (done) => {
    request(app)
      .delete('/api/items/:id') // Replace :id with a valid item ID
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should update an item', (done) => {
    request(app)
      .put('/api/items/:id') // Replace :id with a valid item ID
      .send({ name: 'Updated Item' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
