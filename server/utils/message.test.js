var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', function(){
  it('should generate correct location', function(){
    var from = 'Ben';
    var latitude = 2;
    var longitude = 4;
    var url = 'https://www.google.com/maps?q=2,4'
    var message = generateLocationMessage(from, latitude, longitude);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
