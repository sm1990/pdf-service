const config = require("../../../config");
const baseURL = config("BASE_URL");

module.exports = data => {
  let StartDate = data.StartDate;
  let EndDate = data.EndDate;
  let categories = data.categories;
  let otherComplaintCount = data.other;
  let totalComplaintCount = data.total;
  let totalOpenedCount = data.totalOpenedCount;
  
  let template = `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="${baseURL}/css/bootstrap.min.css" >
				<style>
					@page {
						size: auto;
					}
					table, th, td {
						border: 1px solid black;
						border-collapse: collapse;
						padding: 5px;
					}
					th {
						text-align: center;
					}
					table {
						width: 100%;
					}
					body {
						font-family: serif;
						font-size: medium;
					}
					.document-border {
						padding: 20px;
						padding-left: 50px;
					}
					.bold {
						font-weight: bold;
					}
					.text-center {
						text-align: center;
					}
					.font-small {
						font-size: small
					}
					.grey {
						background-color: #F0F0F0;
					}
				</style>
			</head>
			<body class="document-border">
				<table>
        <tr>
          <th style="border: none; width: 150px">
            <img
              src="${baseURL}/assets/national-emblem.png"
              alt="emblem-srilanka"
              style="height:100px;"
            />
          </th>
          <th style="border: none">
						<div class="bold">ජනාධිපති ලේකම් කාර්යාලය</div>
						<div class="bold">ஜனாதிபதி செயலகம்</div>
						<div class="bold">Presidential Secretariat</div>
          </th>
          <th style="border: none; width: 150px">
            <img
              src="${baseURL}/assets/logo-sect.png"
              alt="elections-logo"
              style="height:100px;"
            /> 
          </th>
				</tr>
				<tr class="grey" style="height: 70px;">
					<th colspan="3">
					<div>
						  සතිපතා සාරාංශ වාර්තාව - කාණ්ඩය මගින් වසා ඇති ඉල්ලීම් ගණන
					</div>
					<div class="font-small">
                      வாராந்திர சுருக்க அறிக்கை - வகையால் மூடப்பட்ட கோரிக்கைகளின் எண்ணிக்கை
					</div>
					<div>
					Weekly Summary Report - No. of requests closed by Category
					</div>
					</th>
				</tr>
				<tr>
					<th colspan="3">
					<span>දිනය/திகதி/Date </span>
					<span> ${StartDate}</span>
					<span> සිට/இருந்து/From </span>
					<span> ${EndDate}</span>
					</th>
				</tr>
				<!--<tr class="grey">
					<th colspan="3">
					<span>පැමිණිලි වර්ගීකරණය / முறைப்பாட்டு வகைப்பாடு / Complaint classification</span>
					</th>-->
				</tr>
				<tr class="grey">
					<th>
						<div>කාණ්ඩය</div>
						<div class="font-small">வகை</div>
						<div>Category</div>
					</th>
					<th>
						<div>අනු කාණ්ඩය</div>
						<div class="font-small">உப வகை</div>
						<div>Subcategory</div>
					</th>
					<th>
						<div>සංඛ්‍යාව</div>
						<div class="font-small">எண்ணிக்கை</div>
						<div>No</div>
					</th>
				</tr>`;

  template += generateCategoryRows(categories);
  template += `
				<tfoot>
				<tr class="grey text-center">
					<th colspan="2">
						<span>එකතුව / மொத்தம் / Total </span>
					</th>
					<th class="text-center">${totalComplaintCount}</th>
				</tr>
				<tr class="grey text-center">
					<th colspan="2">
						<span>විවෘත ගැටළු ගණන / திறந்த சிக்கல்கள் எண்ணிக்கை / No. of issues open </span>
					</th>
					<th class="text-center">${totalOpenedCount}</th>
				</tr>
				</tr>
				</tfoot>
			</table>
		</body>
	</html>`;

  return template;
};

function generateCategoryRows(categories = []) {
  let rowCollection = "";

  for (let i = 0; i < categories.length; i++) {
    let row = "";

    // check if sub categories exist
    if (categories[i].subCategories && categories[i].subCategories.length > 0) {
      let subCategories = categories[i].subCategories;

      row = `<tr>
					<th rowspan=${subCategories.length}>
						<div>${categories[i].categoryNameSinhala}</div>
						<div class="font-small">${categories[i].categoryNameTamil}</div>
					</th>`;

      for (let j = 0; j < subCategories.length; j++) {
        if (j == 0) {
          row += `
                    <td>${subCategories[j].name}</td>
                    <td class="text-center">${subCategories[j].count}</td>
                </tr>`;
        } else {
          row += `<tr>
                            <td>${subCategories[j].name}</td>
                            <td class="text-center">${subCategories[j].count}</td>
                        </tr>`;
        }
      }
    } else {
      break;
    }

    rowCollection += row;
  }

  return rowCollection;
}
