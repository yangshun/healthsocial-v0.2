/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Post = require('./post.model');

exports.register = function(socket) {
  Post.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Post.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  doc.populate({
    path: '_creator',
    select: 'name facebook_id'
  }, function (err, post) {
    socket.emit('post:save', post);
  });
}

function onRemove(socket, doc, cb) {
  socket.emit('post:remove', doc);
}
