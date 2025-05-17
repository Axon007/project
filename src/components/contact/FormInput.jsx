const FormInput = ({ label, type = "text", placeholder, name, value, onChange, icon, required = false }) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium mb-2 text-foreground/90">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">
          {icon}
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 pl-12 rounded-xl border border-secondary/30 bg-secondary/5 focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
    </div>
  );
};

export default FormInput; 