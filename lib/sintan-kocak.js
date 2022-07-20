'use babel';

import SintanKocakView from './sintan-kocak-view';
import { CompositeDisposable } from 'atom';

export default {

  sintanKocakView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.sintanKocakView = new SintanKocakView(state.sintanKocakViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.sintanKocakView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'sintan-kocak:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.sintanKocakView.destroy();
  },

  serialize() {
    return {
      sintanKocakViewState: this.sintanKocakView.serialize()
    };
  },

  toggle() {
    console.log('SintanKocak was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
