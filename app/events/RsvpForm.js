'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { rsvp } from './actions'

function Submit() {
  const { pending } = useFormStatus()
  return <button type="submit" className="form-submit" disabled={pending}>{pending ? 'Registering...' : 'RSVP'}</button>
}

export default function RsvpForm({ eventId }) {
  const [state, action] = useFormState(rsvp, null)

  if (state?.ok) {
    return (
      <div className="form-success">
        <div style={{ fontSize: '36px', marginBottom: '16px' }}>✓</div>
        <p>You're registered! A confirmation email is on its way.</p>
      </div>
    )
  }

  return (
    <form action={action}>
      <input type="hidden" name="event_id" value={eventId} />
      <div className="form-field">
        <label className="form-label">Name *</label>
        <input className="form-input" name="name" required />
      </div>
      <div className="form-field">
        <label className="form-label">Email *</label>
        <input className="form-input" name="email" type="email" required />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label">Phone</label>
          <input className="form-input" name="phone" type="tel" />
        </div>
        <div className="form-field">
          <label className="form-label">Guests (including you)</label>
          <input className="form-input" name="guests" type="number" min="1" max="10" defaultValue="1" />
        </div>
      </div>
      {state?.error && <p style={{ color: '#f87171', fontSize: '14px', marginBottom: '12px' }}>{state.error}</p>}
      <Submit />
    </form>
  )
}
