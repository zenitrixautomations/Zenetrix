import { STATES, type StateKey } from './districts'
import { topServices } from './serviceAreaPages'

// District-by-service pages: every Telangana and Andhra Pradesh district (Hyderabad district has its own locality pages) x the 10 services.
export const regionServicePages = (['telangana', 'andhra-pradesh'] as StateKey[]).flatMap(state =>
  STATES[state].list.filter(d => !(state === 'telangana' && d.slug === 'hyderabad')).flatMap(d => topServices.map(s => ({ state, district: d.slug, service: s.slug }))))
export const regionServiceParams = (state: StateKey) => regionServicePages.filter(x => x.state === state).map(x => ({ district: x.district, service: x.service }))
