sap.ui.define([
        "sap/base/strings/formatMessage"
    ],function() {
	"use strict";

	var Formatter = {
		
		formatDate: function(myDate)
		{
			if(myDate ==undefined)
			{
				return undefined;
			}
			else
			{
				var a = new Date(myDate);
				var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyyy-MM-dd HH:mm" });   
                // @ts-ignore
                return dateFormat.format(a);
			}
		}
	};

	return Formatter;

}, /* bExport= */ true);
