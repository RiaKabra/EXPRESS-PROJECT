import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';
import app from '../../src/index';

let token;
let noteId;

  before(async () => {
    const clearCollections = async () => {
      for (const collection in mongoose.connection.collections) {
        await mongoose.connection.collections[collection].deleteMany({});
      }
    };
  
    await mongoose.connect(process.env.DATABASE_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
    await clearCollections();
  });
  describe('POST /users/signup', () => {
    it('should return status 201 for a new user', async () => {
      const userDetails = {
        firstname: "Ria",
        lastname: "Kabra",
        email: "riakabra1@gmail.com",
        password: '123456'
      };

      const res = await request(app)
        .post('/api/v1/users/signup')
        .send(userDetails);

      expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
      token = res.body.token;
    });

    it('should return status 400 for invalid user details', async () => {
      const userDetails = {
        firstname: 123,
        lastname: "Kabra",
        email: "riakabra1@gmail.com",
        password: '123456'
      };

      const res = await request(app)
        .post('/api/v1/users/signup')
        .send(userDetails);

      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });
   });

  describe('POST /users/login', () => {
    it('should return status 200 for valid login', async () => {
      const userDetails = {
        email: "riakabra1@gmail.com",
        password: '123456'
      };

      const res = await request(app)
        .post('/api/v1/users/login')
        .send(userDetails);

      expect(res.statusCode).to.be.equal(HttpStatus.OK);
      token = res.body.data;
    });

    it('should return status 400 for invalid login details', async () => {
      const userDetails = {
        email: 1000,
        password: '123456'
      };

      const res = await request(app)
        .post('/api/v1/users/login')
        .send(userDetails);

      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });
  });

  describe('POST /users/forget_pswd', () => {
    it('should return status 200 for valid email', async () => {
      const userDetails = {
        email: "riakabra1@gmail.com" 
      };
  
      const res = await request(app)
        .post('/api/v1/users/forget_pswd')
        .set('Authorization', `Bearer ${token}`) 
        .send(userDetails);
  
      expect(res.statusCode).to.be.equal(HttpStatus.OK);
    });
  
    it('should return status 400 for invalid email', async () => {
      const userDetails = {
        email: "invalidemail@domain.com" 
      };
  
      const res = await request(app)
        .post('/api/v1/users/forget_pswd')
        .set('Authorization', `Bearer ${token}`)
        .send(userDetails);
  
      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });
  });
  

describe('POST /users/reset_pswd', () => {
  // it('should return status 200 for valid password reset', async () => {
  //   const userDetails = {
  //     password: 'newpass123!@#$'
  //   };

  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpheWVzaDEyMTIyMEBnbWFpbC5jb20iLCJpZCI6IjY2YTM5MTUwMjJjNzllNjI4MGNkZjBhZSIsImlhdCI6MTcyMjY2MDYwNH0.SIM1JU-k_78uE2CJTz9edZRMVLQOkX7M5xeQfhSidUg';

  //   const res = await request(app)
  //     .post('/api/v1/users/reset_pswd')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send(userDetails);

  //   expect(res.statusCode).to.be.equal(HttpStatus.OK);
  // });

  it('should return status 400 for invalid password reset data', async () => {
    const userDetails = {
      password: 123456  
    };

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpheWVzaDEyMTIyMEBnbWFpbC5jb20iLCJpZCI6IjY2YTM5MTUwMjJjNzllNjI4MGNkZjBhZSIsImlhdCI6MTcyMjY2MDYwNH0.SIM1JU-k_78uE2CJTz9edZRMVLQOkX7M5xeQfhSidUg'; // Replace with a valid JWT token for the test


    const res = await request(app)
      .post('/api/v1/users/reset_pswd')
      .set('Authorization', `Bearer ${token}`)
      .send(userDetails);

    expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
  });
});




// describe('Notes APIs Test', () => {
//   beforeEach(async () => {
//     const res = await request(app)
//       .post('/api/v1/notes')
//       .set('Authorization', `Bearer ${token}`)
//       .send({ title: 'Test Note', description: 'This is a test note' });

//     noteId = res.body.data._id;
//   });

  describe('GET /notes', () => {
    it('should return all notes', async () => {
      const res = await request(app)
        .get('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(res);

      expect(res.statusCode).to.be.equal(HttpStatus.OK);
    });
   });

  describe('POST /notes', () => {
    it('should create a new note', async () => {
      const newNote = {
        title: 'Another Test Note',
        description: 'This is another test note'
      };

      const res = await request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote);

      expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
      noteId = res.body.note._id;
    });

    it('should return status 400 for invalid note data', async () => {
      const invalidNote = {
        title: 123,
        content: 'This is an invalid note'
      };

      const res = await request(app)
        .post('/api/v1/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidNote);

      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });
  });

  describe('GET /notes/:_id', () => {
  
    it('should retrieve a specific note', async () => {
      const res = await request(app)
        .get(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).to.be.equal(HttpStatus.OK);
    });
    it('should return 400 for non-existent note', async () => {
      const Id = '66a77aab4bdbb60bf43d6db7';
      const res = await request(app)
        .get(`/api/v1/notes/${Id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });
  });

  describe('PUT /notes/:_id', () => {
    it('should return status 200 for valid note', async () => {
      const updatedNote = {
        title: 'Updated Test Note',
        description: 'This note has been updated'
      };

      const res = await request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedNote);

      expect(res.statusCode).to.be.equal(HttpStatus.OK);
    });
    it('should return status 400 for invalid note data', async () => {
      const invalidNote = {
        title: 1234,
        description: 'This note has been updated'
      };

      const res = await request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(invalidNote);

      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });

  });

  
  describe('PATCH /notes/colour/:_id', () => {
    it('should update the colour of a note', async () => {
      const res = await request(app)
        .patch(`/api/v1/notes/colour/${noteId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ colour: 'blue' });

      expect(res.statusCode).to.be.equal(HttpStatus.OK);
      expect(res.body.data.colour).to.be.equal('blue');
    });

    it('should return status 400 for invalid colour', async () => {
      const res = await request(app)
        .patch(`/api/v1/notes/colour/${noteId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ colour: 123 });

      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });
 });

 describe('POST /notes/is_arch_unarch/:_id', () => {
  it('should toggle archive status of a note', async () => {
    const res = await request(app)
      .post(`/api/v1/notes/is_arch_unarch/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(res.statusCode).to.equal(HttpStatus.OK);
    expect(res.body.data.isArch).to.be.a('boolean');
  });

  it('should return status 400 for non-existent note', async () => {
    const nonExistentId = "3647483";
    const res = await request(app)
      .post(`/api/v1/notes/is_arch_unarch/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(res.statusCode).to.equal(HttpStatus.BAD_REQUEST);
  });
});

describe('POST /notes/is_trash_untrash/:_id', () => {
  it('should toggle the trashed status of a note', async () => {
    const res = await request(app)
      .post(`/api/v1/notes/is_trash_untrash/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(res.statusCode).to.equal(HttpStatus.OK);
    expect(res.body.data.isTrash).to.be.a('boolean');
  });

  it('should return status 400 for non-existent note', async () => {
    const nonExistentId = "222222";
    const res = await request(app)
      .post(`/api/v1/notes/is_trash_untrash/${nonExistentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(res.statusCode).to.equal(HttpStatus.BAD_REQUEST);
  });
});


  describe('DELETE /notes/:_id', () => {

    it('should return status 400 for non-existent note', async () => {
      const nonExistentNoteId = '66a77aab4bdbb60bf43d6db7';
      const res = await request(app)
        .delete(`/api/v1/notes/${nonExistentNoteId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
    });
    it('should delete a note', async () => {
      const res = await request(app)
        .delete(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).to.be.equal(HttpStatus.OK);
    });
  });
