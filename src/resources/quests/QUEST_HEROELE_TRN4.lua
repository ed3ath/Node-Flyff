QUEST_HEROELE_TRN4 = {
	title = 'IDS_PROPQUEST_INC_001687',
	character = 'MaSa_Parine',
	end_character = 'MaDa_Condram',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_HEROELE_TRN3',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_HEROMARK', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_PERFLYLIP', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001688',
			'IDS_PROPQUEST_INC_001689',
			'IDS_PROPQUEST_INC_001690',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001691',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001692',
		},
		completed = {
			'IDS_PROPQUEST_INC_001693',
			'IDS_PROPQUEST_INC_001694',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001695',
		},
	}
}
