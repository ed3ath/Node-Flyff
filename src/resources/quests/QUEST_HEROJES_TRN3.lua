QUEST_HEROJES_TRN3 = {
	title = 'IDS_PROPQUEST_INC_000536',
	character = 'MaFl_Radyon',
	end_character = 'MaSa_Troupemember5',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ACROBAT' },
		previous_quest = 'QUEST_HEROJES_TRN2',
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
			{ id = 'II_SYS_SYS_QUE_RENSRING', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000537',
			'IDS_PROPQUEST_INC_000538',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000539',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000540',
		},
		completed = {
			'IDS_PROPQUEST_INC_000541',
			'IDS_PROPQUEST_INC_000542',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000543',
		},
	}
}
