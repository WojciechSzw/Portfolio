document.getElementById("form")?.addEventListener("submit", function (event) {
  const btn = document.getElementById("submit_btn");
  event.preventDefault();
  if (btn === null) return;
  btn.value = "Sending...";

  const serviceID = "my_web";
  const templateID = "template_5r403xu";

  const params = {
    form_name: document.querySelector("#form_name").value,
    form_email: document.querySelector("#form_email").value,
    form_message: document.querySelector("#form_message").value,
  };

  emailjs.send(serviceID, templateID, params).then(
    () => {
      btn.value = "Send";
      alert("Sent");
      document.querySelector("#form_name").value = "";
      document.querySelector("#form_email").value = "";
      document.querySelector("#form_message").value = "";
    },
    (err) => {
      btn.value = "Send";
      alert(JSON.stringify(err));
    }
  );
});
