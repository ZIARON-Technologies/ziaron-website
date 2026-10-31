import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SITE } from '../../../data/site.config';
import { ToastService } from '../../../core/services/toast.service';

export type LeadFormVariant = 'waitlist' | 'billing' | 'contact';

/** Celular peruano: 9 dígitos que empiezan con 9, con o sin +51 y espacios. */
const PE_MOBILE = /^(\+?51)?\s?9\d{2}\s?\d{3}\s?\d{3}$/;

const BUSINESS_TYPES = ['Restaurante', 'Pollería', 'Pizzería', 'Chifa', 'Cafetería', 'Otro'];

const SUBJECTS: Record<LeadFormVariant, string> = {
  waitlist: 'Lista de espera — Restaurant OS',
  billing: 'Interés — Facturación electrónica',
  contact: 'Contacto desde ziaron.com',
};

/**
 * Formulario de captación, un solo componente con 3 variantes:
 * - `waitlist` (Restaurant OS): nombre, negocio, tipo, distrito, WhatsApp, correo opcional.
 * - `billing` (Facturación): nombre, empresa, correo, WhatsApp opcional, mensaje opcional.
 * - `contact` (/contacto): nombre, correo, WhatsApp opcional, mensaje.
 * Todas exigen aceptar la Política de privacidad (Ley 29733).
 *
 * Envío: POST JSON a `SITE.formEndpoint` (Formspree o compatible). Si está
 * vacío, el formulario se ve pero el botón queda deshabilitado con aviso
 * honesto (ver data/site.config.ts). Antispam: campo trampa `_gotcha`.
 */
@Component({
  selector: 'app-lead-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './lead-form.component.html',
})
export class LeadFormComponent implements OnInit {
  readonly variant = input<LeadFormVariant>('contact');
  readonly submitLabel = input('Enviar');

  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(ToastService);

  protected readonly enabled = !!SITE.formEndpoint;
  protected readonly businessTypes = BUSINESS_TYPES;
  protected readonly sending = signal(false);
  protected readonly sent = signal(false);
  protected readonly submitted = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    negocio: ['', [Validators.maxLength(100)]],
    tipo: [''],
    distrito: ['', [Validators.maxLength(60)]],
    whatsapp: ['', [Validators.pattern(PE_MOBILE)]],
    email: ['', [Validators.email, Validators.maxLength(120)]],
    mensaje: ['', [Validators.maxLength(1500)]],
    consentimiento: [false, [Validators.requiredTrue]],
    _gotcha: [''],
  });

  ngOnInit(): void {
    const c = this.form.controls;
    const add = (ctrl: { addValidators(v: ValidatorFn): void }, v: ValidatorFn) => ctrl.addValidators(v);
    switch (this.variant()) {
      case 'waitlist':
        add(c.negocio, Validators.required);
        add(c.tipo, Validators.required);
        add(c.distrito, Validators.required);
        add(c.whatsapp, Validators.required);
        break;
      case 'billing':
        add(c.email, Validators.required);
        break;
      case 'contact':
        add(c.email, Validators.required);
        add(c.mensaje, Validators.required);
        break;
    }
    this.form.updateValueAndValidity();
  }

  protected show(field: string): boolean {
    const fields: Record<LeadFormVariant, string[]> = {
      waitlist: ['nombre', 'negocio', 'tipo', 'distrito', 'whatsapp', 'email'],
      billing: ['nombre', 'negocio', 'email', 'whatsapp', 'mensaje'],
      contact: ['nombre', 'email', 'whatsapp', 'mensaje'],
    };
    return fields[this.variant()].includes(field);
  }

  protected isRequired(field: keyof typeof this.form.controls): boolean {
    return this.form.controls[field].hasValidator(Validators.required);
  }

  protected invalid(field: keyof typeof this.form.controls): boolean {
    const ctrl = this.form.controls[field];
    return ctrl.invalid && (ctrl.touched || this.submitted());
  }

  protected async submit(): Promise<void> {
    this.submitted.set(true);
    if (!this.enabled || this.sending()) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Bot: llenó el campo trampa. Se finge éxito sin enviar nada.
    if (this.form.controls._gotcha.value) {
      this.sent.set(true);
      return;
    }

    this.sending.set(true);
    const raw = this.form.getRawValue();
    const payload = Object.fromEntries(
      Object.entries(raw).filter(([k, v]) => k !== '_gotcha' && this.show(k) && v !== ''),
    );
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, consentimiento: true, origen: this.variant(), _subject: SUBJECTS[this.variant()] }),
      });
      if (!res.ok) throw new Error(String(res.status));
      this.sent.set(true);
      this.form.reset();
      this.submitted.set(false);
      this.toast.show('success', '¡Recibido!', 'Te escribiremos pronto. Gracias por tu interés en ZIARON.');
    } catch {
      this.toast.show('error', 'No pudimos enviar tu mensaje', 'Revisa tu conexión e inténtalo otra vez en unos minutos.');
    } finally {
      this.sending.set(false);
    }
  }
}
