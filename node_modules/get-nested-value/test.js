const test = require('tape');
const getNestedValue = require('./readme');

const user = {
  id: 1,
  car: {
    id: 2,
  },
  insurance: {
    company: {
      meta: {
        id: 3,
      }
    }
  },
  offers: {
    declined: [{
      agency: {
        agents: [{
          id: 4,
        }]
      }
    }]
  }
};

test('string path access works', (t) => {
  t.plan(4);
  t.equal(getNestedValue('id', user), 1);
  t.equal(getNestedValue('car.id', user), 2);
  t.equal(getNestedValue('insurance.company.meta.id', user), 3);
  t.equal(getNestedValue('offers.declined.0.agency.agents.0.id', user), 4);
  t.end();
});

test('array path access works', (t) => {
  t.plan(4);
  t.equal(getNestedValue(['id'], user), 1);
  t.equal(getNestedValue(['car', 'id'], user), 2);
  t.equal(getNestedValue(['insurance', 'company', 'meta', 'id'], user), 3);
  t.equal(getNestedValue(['offers', 'declined', 0, 'agency', 'agents', 0, 'id'], user), 4);
  t.end();
});

test('non-existing paths return undefined', (t) => {
  t.plan(4);
  t.equal(getNestedValue(['foo'], user), undefined);
  t.equal(getNestedValue(['foo', 'bar', 0, 1, 2], user), undefined);
  t.equal(getNestedValue('foo', user), undefined);
  t.equal(getNestedValue('foo.bar.0.1.2', user), undefined);
  t.end();
});

test('throws when contract is not followed', (t) => {
  t.plan(1);
  try {
    t.equal(getNestedValue({}, user), undefined);
  } catch (e) {
    t.equal(e.message, 'The package get-nested-value received a non-contract path. Please provide a string, number, or an array of those!')
  }
  t.end();
});

test('README example works', (t) => {
    t.plan(1);
    t.equal(
        getNestedValue('a.b.0.c.d', { a: { b: [{ c: { d: 'hello!' } }] } }),
        'hello!'
    );
    t.end();
});

test('works with arrays of arrays', (t) => {
    t.plan(1);
    t.equal(
        getNestedValue([0, 1, 2, 'key'], [ [ [], [{}, {}, { key: 'hello!' }] ] ]),
        'hello!'
    );
    t.end();
});
