QUEST_HEROPSY_TRN3 = {
	title = 'IDS_PROPQUEST_INC_001622',
	character = 'MaFl_Cuarine',
	end_character = 'MaFl_Ryupang',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_MAGICIAN' },
		previous_quest = 'QUEST_HEROPSY_TRN2',
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
			{ id = 'II_SYS_SYS_QUE_UNDERSTRENGTH', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_001623',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_001624',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_001625',
		},
		completed = {
			'IDS_PROPQUEST_INC_001626',
			'IDS_PROPQUEST_INC_001627',
			'IDS_PROPQUEST_INC_001628',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_001629',
		},
	}
}
