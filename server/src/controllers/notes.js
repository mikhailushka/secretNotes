import Note from '../models/note-model.js';
import ShortUniqueId from 'short-unique-id';
import crypto from 'crypto';
import { ENCRYPT_ALGORITHM } from '../constants.js';

function encrypt(text, password) {
  var cipher = crypto.createCipher(ENCRYPT_ALGORITHM, password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
};

function decrypt(text, password) {
  var decipher = crypto.createDecipher(ENCRYPT_ALGORITHM, password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
};

export const notesCreateNote = (req, res) => {
  let generatedUniqUrl = new ShortUniqueId()

  let passwordHash = encrypt(req.body.password, req.body.password);
  let descriptionHash = encrypt(req.body.description, req.body.password);

  let generatedUrl = generatedUniqUrl.randomUUID(6);

  const note = new Note({
    description: descriptionHash,
    password: passwordHash,
    uniqUrl: generatedUrl
  })

  note.save((err, data) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.send({
        success: true,
        message: `Note with ID_${data._id} saved successfully!`,
        uniqUrl: data.uniqUrl
      })
    }
  })
};

export const notesGetNote = (req, res) => {
  Note.findOne({ uniqUrl: req.params.uniqUrl }).exec((err, note) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.send(note)
    }
  })
};

export const notesAceesToNote = (req, res) => {
  Note.findOne({ uniqUrl: req.params.uniqUrl }).exec((err, note) => {
    if (err) {
      res.sendStatus(500)
    } else if (!note) {
      res.sendStatus(404)
    } else {
      let a;
      try {
        a = decrypt(note.password, req.params.password);
      } catch (eass) {
        return res.send({
          password: 'invalid'
        });
      }
      if (a === req.params.password) {
        res.send({
          description: a
        })
      } else {
        res.send({
          password: 'invalid'
        })
        console.log('User try read note with invalid password')
      }
    }
  })
};

export const notesDeleteNote = (req, res) => {
  Note.findOne({ uniqUrl: req.params.uniqUrl }).exec((err, note) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else if (!note) {
      console.log('Note not found')
      res.sendStatus(200)
    } else {
      let a;
      try {
        a = decrypt(note.password, req.params.password);
      } catch (asd) {
        return res.send({
          password: 'invalid'
        })
      }
      if (a === req.params.password) {
        Note.remove({ uniqUrl: req.params.uniqUrl }, err => {
          if (err) {
            res.sendStatus(500)
          } else {
            res.sendStatus(200)
          }
        })
      } else {
        res.send({
          password: 'invalid'
        })
        console.log('User try delete note with invalid password')
      }
    }
  })
};
