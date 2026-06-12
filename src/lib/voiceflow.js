export const LoadVoiceFlowAgent = () => {
  if (typeof window === 'undefined') return;
  if (window.voiceflowLoaded) return;
  window.voiceflowLoaded = true;

  const scriptId = "voiceflow-widget-script";
  if (document.getElementById(scriptId)) return;

  var v = document.createElement("script");
  v.id = scriptId;
  v.onload = function () {
    window.voiceflow.chat.load({
      verify: { projectID: '672e76927263cdd775eb9f16' },
      url: "https://general-runtime.voiceflow.com",
      versionID: "production",
    });
  };
  v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
  v.type = "text/javascript";
  document.head.appendChild(v);
};
