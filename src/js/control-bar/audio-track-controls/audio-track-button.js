import MenuButton from '../../menu/menu-button.js';
import Component from '../../component.js';
import * as Fn from '../../utils/fn.js';
import AudioTrackMenuItem from './audio-track-menu-item.js';

class AudioTrackButton extends MenuButton {
  constructor(player, options) {
    super(player, options);
    this.el_.setAttribute('aria-label','Audio Menu');

    var tracks = this.player_.audioTracks();

    if (this.items.length <= 1) {
      this.hide();
    }

    if (!tracks) {
      return;
    }

    var updateHandler = Fn.bind(this, this.update);
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    this.player_.on('dispose', function() {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
  }

  buildCSSClass() {
    return `vjs-subtitles-button ${super.buildCSSClass()}`;
  }

  createItems(items) {
    items = items || [];

    var tracks = this.player_.audioTracks();

    if (!tracks) {
      return items;
    }

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];

      items.push(new AudioTrackMenuItem(this.player_, {
        // MenuItem is selectable
        'selectable': true,
        'track': track
      }));
    }

    return items;
  }
}

Component.registerComponent('AudioTrackButton', AudioTrackButton);
export default AudioTrackButton;
