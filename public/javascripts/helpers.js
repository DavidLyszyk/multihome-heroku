function SetTemplateValue(template, item_id, item_value) {
	var d = template.content.querySelector(item_id);
	d.textContent = item_value;
}

