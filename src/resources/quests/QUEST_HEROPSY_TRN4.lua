QUEST_HEROPSY_TRN4 = {
	title = 'IDS_PROPQUEST_INC_001632',
	character = 'MaFl_Ryupang',
	end_character = 'MaDa_Pereb',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_HEROPSY_TRN3',
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
			{ id = 'II_SYS_SYS_QUE_TRAOPEREB', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001633',
			'IDS_PROPQUEST_INC_001634',
			'IDS_PROPQUEST_INC_001635',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001636',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001637',
		},
		completed = {
			'IDS_PROPQUEST_INC_001638',
			'IDS_PROPQUEST_INC_001639',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001640',
		},
	}
}
