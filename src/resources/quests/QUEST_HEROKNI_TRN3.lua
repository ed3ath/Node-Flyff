QUEST_HEROKNI_TRN3 = {
	title = 'IDS_PROPQUEST_INC_001385',
	character = 'MaFl_Hormes',
	end_character = 'MaFl_Kurumin',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MERCENARY' },
		previous_quest = 'QUEST_HEROKNI_TRN2',
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
			{ id = 'II_SYS_SYS_QUE_GOLDHELM', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001386',
			'IDS_PROPQUEST_INC_001387',
			'IDS_PROPQUEST_INC_001388',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001389',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001390',
		},
		completed = {
			'IDS_PROPQUEST_INC_001391',
			'IDS_PROPQUEST_INC_001392',
			'IDS_PROPQUEST_INC_001393',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001394',
		},
	}
}
