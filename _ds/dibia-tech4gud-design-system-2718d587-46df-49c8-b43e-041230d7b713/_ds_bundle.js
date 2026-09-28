/* @ds-bundle: {"format":4,"namespace":"DIBIATech4GudDesignSystem_2718d5","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Tech4GudSite","sourcePath":"ui_kits/tech4gud/Tech4GudSite.jsx"},{"name":"VeilConsole","sourcePath":"ui_kits/tech4gud/VeilConsole.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"31b12efa5fa3","components/actions/IconButton.jsx":"88ffba0e5340","components/display/Badge.jsx":"0e08f975eda5","components/display/Card.jsx":"551ca4b26ae1","components/display/Tag.jsx":"51af2352a760","components/feedback/Dialog.jsx":"7af2c887d23b","components/feedback/Toast.jsx":"210311055d6b","components/feedback/Tooltip.jsx":"113118b43aab","components/forms/Checkbox.jsx":"5b63a0f1a34c","components/forms/Input.jsx":"649da2260dee","components/forms/Radio.jsx":"00174250b66e","components/forms/Select.jsx":"0bb637664954","components/forms/Switch.jsx":"fd86c44853de","components/navigation/Tabs.jsx":"dbaafbab75fd","ui_kits/tech4gud/Tech4GudSite.jsx":"fbc4e53ccc30","ui_kits/tech4gud/VeilConsole.jsx":"4bbbf97b5201"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DIBIATech4GudDesignSystem_2718d5 = window.DIBIATech4GudDesignSystem_2718d5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    className: `t4g-btn t4g-btn--${variant} t4g-btn--${size} ${className}`
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  variant = 'ghost',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    className: `t4g-btn t4g-iconbtn t4g-btn--${variant} t4g-btn--${size} t4g-iconbtn--${size} ${className}`
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  violet: ['--accent-soft', '--violet-300'],
  gold: ['--warning-soft', '--gold-400'],
  emerald: ['--positive-soft', '--emerald-300'],
  crimson: ['--danger-soft', '--crimson-300'],
  amber: ['--warning-soft', '--amber-400'],
  cyan: ['--info-soft', '--cyan-300'],
  neutral: ['--surface-raised', '--text-muted']
};
function Badge({
  tone = 'violet',
  className = '',
  style,
  children,
  ...rest
}) {
  const [bg, fg] = TONES[tone] || TONES.violet;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `t4g-badge ${className}`,
    style: {
      background: `var(${bg})`,
      color: `var(${fg})`,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  variant = 'default',
  padding = 24,
  className = '',
  style,
  children,
  ...rest
}) {
  const cls = variant === 'cut' ? 't4g-card t4g-card--cut' : variant === 'glow' ? 't4g-card t4g-card--glow' : 't4g-card';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `${cls} ${className}`,
    style: {
      padding,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  onDismiss,
  className = '',
  style,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `t4g-tag ${className}`,
    style: style
  }, rest), children, onDismiss && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Remove",
    onClick: onDismiss
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  actions,
  onClose,
  inline,
  className = '',
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: `t4g-dialog-backdrop ${inline ? 't4g-dialog-backdrop--inline' : ''}`,
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    className: `t4g-dialog ${className}`,
    style: style
  }, title && /*#__PURE__*/React.createElement("h2", null, title), /*#__PURE__*/React.createElement("div", {
    className: "t4g-dialog-body"
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    className: "t4g-dialog-actions"
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const DOTS = {
  positive: '--positive',
  danger: '--danger',
  warning: '--warning',
  info: '--info',
  violet: '--accent'
};
function Toast({
  tone = 'violet',
  title,
  children,
  onDismiss,
  className = '',
  style
}) {
  const c = DOTS[tone] || DOTS.violet;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    className: `t4g-toast ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("span", {
    className: "t4g-toast-dot",
    style: {
      background: `var(${c})`,
      boxShadow: `0 0 12px var(${c})`
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t4g-toast-title"
  }, title), children && /*#__PURE__*/React.createElement("div", {
    className: "t4g-toast-msg"
  }, children)), onDismiss && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Dismiss",
    onClick: onDismiss
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children,
  className = '',
  style
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    className: `t4g-tipwrap ${className}`,
    style: style,
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    className: "t4g-tip"
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  disabled,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `t4g-choice ${disabled ? 't4g-choice--disabled' : ''} ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "t4g-box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  invalid,
  id,
  className = '',
  style,
  ...rest
}) {
  const rid = React.useId();
  const iid = id || rid;
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "t4g-label",
    htmlFor: iid
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: iid,
    className: `t4g-input ${invalid ? 't4g-input--invalid' : ''} ${className}`,
    "aria-invalid": invalid || undefined
  }, rest)), hint && /*#__PURE__*/React.createElement("div", {
    className: `t4g-hint ${invalid ? 't4g-hint--invalid' : ''}`
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  disabled,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `t4g-choice ${disabled ? 't4g-choice--disabled' : ''} ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "t4g-dot"
  }), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  invalid,
  id,
  options = [],
  className = '',
  style,
  children,
  ...rest
}) {
  const rid = React.useId();
  const iid = id || rid;
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "t4g-label",
    htmlFor: iid
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "t4g-selectwrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: iid,
    className: `t4g-input t4g-select ${invalid ? 't4g-input--invalid' : ''} ${className}`,
    "aria-invalid": invalid || undefined
  }, rest), children || opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), hint && /*#__PURE__*/React.createElement("div", {
    className: `t4g-hint ${invalid ? 't4g-hint--invalid' : ''}`
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  disabled,
  className = '',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `t4g-choice ${disabled ? 't4g-choice--disabled' : ''} ${className}`,
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "t4g-track"
  }), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  active,
  defaultActive,
  onChange,
  className = '',
  style
}) {
  const [internal, setInternal] = React.useState(defaultActive ?? (items[0] && items[0].id));
  const cur = active !== undefined ? active : internal;
  const pick = id => {
    if (active === undefined) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    className: `t4g-tabs ${className}`,
    style: style
  }, items.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    role: "tab",
    "aria-selected": cur === t.id,
    className: `t4g-tab ${cur === t.id ? 't4g-tab--active' : ''}`,
    onClick: () => pick(t.id)
  }, t.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/tech4gud/Tech4GudSite.jsx
try { (() => {
const STRATS = {
  a: {
    label: 'Avoidance',
    proj: 'GoldiLocks',
    tone: 'amber',
    koan: 'A stream never captured cannot betray you.',
    body: 'Sense a different modality — gaze, not the camera. The system reads the wearer, never images the world.'
  },
  m: {
    label: 'Mitigation',
    proj: 'InPlainGaze',
    tone: 'cyan',
    koan: 'Abstraction is not privacy — representation is the lever.',
    body: 'Re-encode the permitted signal — the Veil. Keep the use, shed the identity.'
  },
  p: {
    label: 'Protection',
    proj: 'ARPA',
    tone: 'violet',
    koan: 'I see the lie before it wears a face.',
    body: 'Defend against deceptive overlays before they render. A distributed council of guardians shields the people.'
  }
};
function Tech4GudSite() {
  const [strat, setStrat] = React.useState('p');
  const s = STRATS[strat];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100%',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '0 48px',
      height: 72,
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--text-strong)',
      letterSpacing: '0.02em'
    }
  }, "DIBIA"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 26,
      font: 'var(--type-body-strong)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#stack"
  }, "The stack"), /*#__PURE__*/React.createElement("a", {
    href: "#strategies"
  }, "The framework"), /*#__PURE__*/React.createElement("a", {
    href: "#alchemists"
  }, "The alchemists")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm"
  }, "The film"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "gold",
    size: "sm"
  }, "Come build"))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px 48px 80px',
      maxWidth: 980,
      margin: '0 auto',
      textAlign: 'center',
      background: 'var(--grad-veil)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--violet-300)'
    }
  }, "#Tech4Gud \xB7 a utopian cyberpunk future"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-hero)',
      color: 'var(--text-strong)',
      margin: '20px 0 0'
    }
  }, "Read the wearer,", /*#__PURE__*/React.createElement("br", null), "not the ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--grad-flame)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    }
  }, "world.")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-koan)',
      color: 'var(--gold-300)',
      margin: '26px auto 0',
      maxWidth: 560
    }
  }, "\u201CMagic that takes without asking is sorcery. You will learn to give.\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-muted)',
      margin: '14px auto 0',
      maxWidth: 600
    }
  }, "Augmented reality that veils and protects \u2014 an inversion of Hyper-Reality, built on a distributed council of human guardians. On-device. On by default. For everyone."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg"
  }, "Ignite the Veil"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    variant: "secondary"
  }, "Read the research")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48,
      justifyContent: 'center',
      marginTop: 56,
      font: 'var(--type-data)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-display)',
      fontSize: 22
    }
  }, "\u224885%"), /*#__PURE__*/React.createElement("br", null), "task utility retained"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-display)',
      fontSize: 22
    }
  }, "~10\xD7"), /*#__PURE__*/React.createElement("br", null), "fewer re-identifications"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-display)',
      fontSize: 22
    }
  }, "on-device"), /*#__PURE__*/React.createElement("br", null), "and on by default"))), /*#__PURE__*/React.createElement("section", {
    id: "strategies",
    style: {
      padding: '72px 48px',
      maxWidth: 980,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Impondo Zenkomo \u2014 the horns close around the herd"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h2)',
      color: 'var(--text-strong)',
      margin: '12px 0 24px'
    }
  }, "Three transmutations"), /*#__PURE__*/React.createElement(__ds_scope.Tabs, {
    items: [{
      id: 'a',
      label: 'Avoidance'
    }, {
      id: 'm',
      label: 'Mitigation'
    }, {
      id: 'p',
      label: 'Protection'
    }],
    active: strat,
    onChange: setStrat
  }), /*#__PURE__*/React.createElement(__ds_scope.Card, {
    variant: "cut",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: s.tone
  }, s.proj), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-data)',
      color: 'var(--text-faint)'
    }
  }, "strategy ", strat === 'a' ? '01' : strat === 'm' ? '02' : '03', " \xB7 ", s.label.toLowerCase())), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-koan)',
      color: 'var(--gold-300)',
      margin: '18px 0 10px'
    }
  }, "\u201C", s.koan, "\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-muted)',
      margin: 0,
      maxWidth: 640
    }
  }, s.body))), /*#__PURE__*/React.createElement("section", {
    id: "stack",
    style: {
      padding: '72px 48px',
      maxWidth: 980,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "What DIBIA builds"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h2)',
      color: 'var(--text-strong)',
      margin: '12px 0 24px'
    }
  }, "The #Tech4Gud stack"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Card, {
    variant: "glow"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-strong)'
    }
  }, "SpatialSensai"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      margin: '8px 0 14px'
    }
  }, "Private XR sensing \u2014 the foundation. Gates every other track."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, null, "gaze"), /*#__PURE__*/React.createElement(__ds_scope.Tag, null, "on-device"))), /*#__PURE__*/React.createElement(__ds_scope.Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-strong)'
    }
  }, "DigiDinar"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      margin: '8px 0 14px'
    }
  }, "Trust as currency, for a community that gives."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, null, "trust"), /*#__PURE__*/React.createElement(__ds_scope.Tag, null, "concept"))), /*#__PURE__*/React.createElement(__ds_scope.Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-strong)'
    }
  }, "#ThirdPlace"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)',
      margin: '8px 0 14px'
    }
  }, "A configurable social hub \u2014 the oasis, rendered."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, null, "social"), /*#__PURE__*/React.createElement(__ds_scope.Tag, null, "concept"))))), /*#__PURE__*/React.createElement("section", {
    id: "alchemists",
    style: {
      padding: '72px 48px 88px',
      maxWidth: 980,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "You cannot transmute alone"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h2)',
      color: 'var(--text-strong)',
      margin: '12px 0 24px'
    }
  }, "The alchemists"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px 24px'
    }
  }, [['Cory “Ike” Ilo', 'Lead · XR privacy', 'violet'], ['Cedrick K. Ilo', '', 'gold'], ['Nikki Alabanza', 'Protection / dark patterns', 'emerald'], ['Cherelle Connor', '', 'cyan'], ['Brendan David-John', '', 'amber']].map(([n, r, t]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '12px 16px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-subtle)',
      background: 'var(--surface-raised)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: `var(--${t === 'violet' ? 'violet-400' : t === 'gold' ? 'gold-400' : t === 'emerald' ? 'emerald-400' : t === 'cyan' ? 'cyan-400' : 'amber-400'})`,
      boxShadow: `0 0 10px var(--${t === 'violet' ? 'violet-400' : t === 'gold' ? 'gold-400' : t === 'emerald' ? 'emerald-400' : t === 'cyan' ? 'cyan-400' : 'amber-400'})`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-strong)',
      color: 'var(--text-strong)'
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-data)',
      fontSize: 12,
      color: 'var(--text-faint)',
      marginLeft: 'auto'
    }
  }, r))))), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      padding: '40px 48px',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 16,
      color: 'var(--text-strong)'
    }
  }, "DIBIA"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-data)',
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, "#Tech4Gud \xB7 DIBIA \xB7 Vessels of the Most High, Netrunners across the Diaspora"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-koan)',
      fontSize: 14,
      color: 'var(--gold-300)',
      marginLeft: 'auto'
    }
  }, "Protection on the regular. By default. For everyone.")));
}
Object.assign(__ds_scope, { Tech4GudSite });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/tech4gud/Tech4GudSite.jsx", error: String((e && e.message) || e) }); }

// ui_kits/tech4gud/VeilConsole.jsx
try { (() => {
const EyeIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}));
const SettingsIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
}));
const NODES = [{
  id: 'n1',
  name: 'Nnewi Market',
  status: 'emerald',
  guardians: 12
}, {
  id: 'n2',
  name: 'Transit Line 4',
  status: 'emerald',
  guardians: 8
}, {
  id: 'n3',
  name: 'Sector 7 Plaza',
  status: 'crimson',
  guardians: 3
}, {
  id: 'n4',
  name: 'The Oasis',
  status: 'emerald',
  guardians: 21
}, {
  id: 'n5',
  name: 'Archive Row',
  status: 'amber',
  guardians: 5
}];
function VeilConsole() {
  const [veil, setVeil] = React.useState(true);
  const [node, setNode] = React.useState('n3');
  const [tab, setTab] = React.useState('feed');
  const sel = NODES.find(n => n.id === node);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      minHeight: 720,
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 280,
      flex: 'none',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 17,
      color: 'var(--text-strong)'
    }
  }, "SpatialSensai"), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: veil ? 'emerald' : 'crimson'
  }, veil ? 'veil on' : 'veil off')), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px 12px',
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)'
    }
  }, "Council nodes"), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'auto',
      padding: '0 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, NODES.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    onClick: () => setNode(n.id),
    style: {
      all: 'unset',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      background: node === n.id ? 'var(--accent-soft)' : 'transparent',
      border: node === n.id ? '1px solid var(--border-accent)' : '1px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: `var(--${n.status}-400)`,
      boxShadow: `0 0 8px var(--${n.status}-400)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-body-strong)',
      fontSize: 14,
      color: node === n.id ? 'var(--text-strong)' : 'var(--text-muted)'
    }
  }, n.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-data)',
      fontSize: 11,
      color: 'var(--text-faint)',
      marginLeft: 'auto'
    }
  }, n.guardians)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: 20,
      borderTop: '1px solid var(--border-subtle)',
      font: 'var(--type-data)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, "#Tech4Gud \xB7 DIBIA", /*#__PURE__*/React.createElement("br", null), "console v0 \xB7 concept")), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 28px',
      height: 68,
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-strong)'
    }
  }, sel.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-data)',
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, sel.guardians, " guardians \xB7 ", sel.status === 'emerald' ? 'shielded' : sel.status === 'amber' ? 'degraded' : 'under attack')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Switch, {
    label: "Veil",
    checked: veil,
    onChange: e => setVeil(e.target.checked)
  }), /*#__PURE__*/React.createElement(__ds_scope.Tooltip, {
    label: "gaze only \u2014 no camera"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    "aria-label": "Sensing mode",
    variant: "secondary"
  }, /*#__PURE__*/React.createElement(EyeIcon, null))), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    "aria-label": "Settings"
  }, /*#__PURE__*/React.createElement(SettingsIcon, null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 28px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 14
    }
  }, [['streams veiled', '1,204', 'violet'], ['bystanders protected', '8,911', 'emerald'], ['overlays flagged', '17', 'crimson']].map(([l, v, t]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      padding: '16px 18px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 30,
      color: t === 'violet' ? 'var(--violet-300)' : t === 'emerald' ? 'var(--emerald-300)' : 'var(--crimson-300)'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-data)',
      fontSize: 11,
      color: 'var(--text-faint)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 28px 0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tabs, {
    items: [{
      id: 'feed',
      label: 'Omen feed'
    }, {
      id: 'guard',
      label: 'Guardians'
    }, {
      id: 'sense',
      label: 'Sensing'
    }],
    active: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 28px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      overflow: 'auto'
    }
  }, tab === 'feed' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Toast, {
    tone: "danger",
    title: "Deceptive overlay flagged",
    onDismiss: () => {}
  }, "Blocked before render \xB7 storefront halo, aisle 3."), /*#__PURE__*/React.createElement(__ds_scope.Toast, {
    tone: "positive",
    title: "Veil re-ignited"
  }, "Coverage restored across 12 nodes."), /*#__PURE__*/React.createElement(__ds_scope.Toast, {
    tone: "info",
    title: "New guardian joined"
  }, "BATIK accepted the watch \xB7 mitigation duty."), /*#__PURE__*/React.createElement(__ds_scope.Toast, {
    tone: "warning",
    title: "Gaze stream degraded"
  }, "Falling back to avoidance-only sensing.")), tab === 'guard' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, ['DIBIA', 'LUNAR', 'ÁMBAR', 'BATIK', 'CEIBA'].map((g, i) => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: g
  }, g, " \xB7 ", ['protection', 'giving', 'avoidance', 'mitigation', 'network'][i]))), tab === 'sense' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Switch, {
    label: "Gaze context (on-device)",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(__ds_scope.Switch, {
    label: "Presence awareness",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(__ds_scope.Switch, {
    label: "World camera"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-faint)'
    }
  }, "A stream never captured cannot betray you.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "gold",
    size: "sm"
  }, "Convene the council")))));
}
Object.assign(__ds_scope, { VeilConsole });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/tech4gud/VeilConsole.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tech4GudSite = __ds_scope.Tech4GudSite;

__ds_ns.VeilConsole = __ds_scope.VeilConsole;

})();
