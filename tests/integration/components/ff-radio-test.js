import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ff-radio', 'Integration | Component | ff radio', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ff-radio}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ff-radio}}`);

  assert.equal(this.$('input[type=radio]').length, 1);
});

test('it updates `value` when clicked', function(assert) {
  assert.expect(7);

  this.render(hbs`
    {{ff-radio groupValue=groupValue value="val1" on-change=(action (mut groupValue))}}
    {{ff-radio groupValue=groupValue value="val2" on-change=(action (mut groupValue))}}

    <span class="group-value">{{groupValue}}</span>
  `);

  assert.equal(this.$('.group-value').text(), '', 'initial value is correct');

  this.$('input')[0].click();

  assert.equal(this.$('.group-value').text(), 'val1', 'value is updated correctly');
  assert.equal(this.$('input')[0].checked, true, 'correct radio checked');
  assert.equal(this.$('input')[1].checked, false, 'correct radio unchecked');

  this.$('input')[1].click();

  assert.equal(this.$('.group-value').text(), 'val2', 'value is updated correctly');
  assert.equal(this.$('input')[0].checked, false, 'correct radio unchecked');
  assert.equal(this.$('input')[1].checked, true, 'correct radio checked');
});

test('it updates `checked` state when groupValue is changed', function(assert) {
    assert.expect(2);

    this.render(hbs`
      {{ff-radio groupValue=groupValue value="val1"}}
    `);

    assert.equal(this.$('input')[0].checked, false, 'radio unchecked');

    this.set('groupValue', 'val1');

    assert.equal(this.$('input')[0].checked, true, 'radio checked');
});

test('it fires the `on-change` event when clicked', function(assert) {
    assert.expect(1);

    this.set('onChangeAction', (value) => {
        assert.equal(value, 'val1', 'correct value sent on change');
    });

    this.render(hbs`
      {{ff-radio value="val1" on-change=(action onChangeAction)}}
    `);

    this.$('input').click();
});

test('it is not checked unless groupValue==value', function(assert) {
    assert.expect(1);

    this.render(hbs`
      {{ff-radio value="val1"}}
    `);

    this.$('input').click();

    assert.equal(this.$('input')[0].checked, false, 'radio remains unchecked');
});

test('an id can be passed down to the radio', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ff-radio radioId="foo"}}`);

  assert.equal(this.$('input').attr('id'), 'foo', 'id correct');
});

test('the id generates normally if no radioId is provided', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ff-radio}}`);

  assert.ok(/ember\d+/.test(this.$('input').attr('id')), 'id is a default ember id');
});
