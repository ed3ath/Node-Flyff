QUEST_HERORIN_TRN3 = {
	title = 'IDS_PROPQUEST_INC_001564',
	character = 'MaFl_Clamb',
	end_character = 'MaFl_Teshar',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ASSIST' },
		previous_quest = 'QUEST_HERORIN_TRN2',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_SCRSTAMP', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_MARKEIEN', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001565',
			'IDS_PROPQUEST_INC_001566',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001567',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001568',
		},
		completed = {
			'IDS_PROPQUEST_INC_001569',
			'IDS_PROPQUEST_INC_001570',
			'IDS_PROPQUEST_INC_001571',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001572',
		},
	}
}
