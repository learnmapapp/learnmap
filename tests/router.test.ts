import { describe, expect, it } from 'vitest';
import { href, parseHash } from '../src/router';

describe('router', () => {
  it.each([
    ['#/', { course: null, node: null, to: null }],
    ['#/latex', { course: 'latex', node: null, to: null }],
    ['#/latex/tikz', { course: 'latex', node: 'tikz', to: null }],
    ['#/latex?to=photo-collage', { course: 'latex', node: null, to: 'photo-collage' }],
    ['#/latex/tikz?to=photo-collage', { course: 'latex', node: 'tikz', to: 'photo-collage' }],
    ['#/latex?to=', { course: 'latex', node: null, to: null }],
    ['#/c%2B%2B/a%20b', { course: 'c++', node: 'a b', to: null }],
  ])('parses %s', (hash, expected) => {
    expect(parseHash(hash)).toEqual(expected);
  });

  it.each([
    ['latex', null, null],
    ['latex', 'tikz', null],
    ['latex', null, 'photo-collage'],
    ['latex', 'tikz', 'a b&c'],
  ])('round-trips href(%s, %s, %s)', (course, node, to) => {
    expect(parseHash(href(course, node, to))).toEqual({ course, node, to });
  });
});
